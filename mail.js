const nodemailer = require('nodemailer');
const config = require('./config/main');

module.exports = function() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: config.mailService,
        auth: config.mailAuth
    });
    
    return {
        sendMail : (opts) => {
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Movies Login" <zeeskhan1990@gmail.com>', // sender address, but not honoured by Gmail,
                to: opts.toAddresses, // list of receivers
                subject: opts.subject,
                text: opts.text,
                html: opts.html
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                transporter.close();
            });
        }
    }
}

