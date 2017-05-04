module.exports = {  
  // Secret key for JWT signing and encryption
  'jwtSecret': 'movies',
  //Setting no session management
  'jwtSession': {
      session: false
  },
  // Database connection information
  'database': 'mongodb://localhost:27017/movies',
  // Setting port for server
  'port': process.env.PORT || 3000,
  // Secret key for OTP generation
  //'otpSecret': 'movies',
  // Token validation duration
  'otpStep': 300,
  'otpDigits': 4,
  //Transporter object config for email service
  'mailService' : 'gmail',
  //Transporter object auth creds
  'mailAuth' : {
        user: 'allaboutmoviesapp@gmail.com',
        pass: 'AllAbout'
    }
}