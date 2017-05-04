const otplib = require('otplib').default;
const config = require('./config/main');
const mailer = require('./mail')();
const User = require('./models/user');

module.exports = function() {

  const createSecret = (email, onGeneration) => {
    otplib.authenticator.options = {
        step :  config.otpStep,
        digits : config.otpDigits
    };

    const secret = otplib.authenticator.generateSecret();

    setToken(secret, email, onGeneration);
  }

  const setToken = (secret, email, onGeneration) => {
    // find the user by email and update the current OTP
    return User.findOneAndUpdate({ email: email }, {otp_secret: secret}, function(err, user) {
        if (err)
            throw err;

        // we have the updated user returned to us
        console.log(user);
        const token = otplib.authenticator.generate(secret);

        //Send mail with the current OTP token
        mailer.sendMail({
            'toAddresses': email,
            'subject': 'OTP for logging into All about movies',
            'text': 'Please enter this value for logging in: ' + token,
            'html': '<div> Please enter this value for logging in: '+ token + '</div>'
        });
        //Call the on generation callback with the token being passed
        onGeneration(token);
    });
  }

  const verifyOtp = (email, inputValue, onVerification) => {
        return User.findOne({email: email}, (err, user) => {
            if(err)
                throw err
            if (otplib.authenticator.check(inputValue, user.otp_secret)) 
                onVerification(user)
            else
                onVerification(null)
        });
  }

  return {
      generateOtp : createSecret,
      verifyOtp : verifyOtp
  }
}