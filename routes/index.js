const express = require('express');
const jwt = require("jwt-simple");  
const User = require('../models/user');
const config = require('../config/main');
const otpService = require('../otp.js')();

const router = express.Router();

/* POST request for generating OTP */
router.post("/otp", function(req, res, next) {
    console.log("Test");  
    if (req.body.email) {
        const email = req.body.email;
        User.findOne({email: email}, (err, user) => {
          if (err)
            return next(err);

          const onGeneration = (otp) => {
            res.status(200).json({message: 'Otp generated'});
          }

          if (user) {
            otpService.generateOtp(email, onGeneration);
          } else {
              res.status(401).json({error: 'No user found with the given email id'});
          }
        });
    } else {
        res.status(401).json({error: 'Email id is missing'});
    }
});

/* POST request for login */
router.post("/login", function(req, res, next) {  
    if (req.body.email && req.body.otp) {
        const email = req.body.email;
        const otp = req.body.otp;
        const onVerification = (user) => {
          if (user) {
            User.findOneAndUpdate({email: email}, {isLoggedIn: true}, (err, user) => {
              if(err)
                  return next(err);
              const payload = {email: user.email};
              const token = jwt.encode(payload, config.jwtSecret);
              res.json({
                  token: token
              });
            });
          } else {
              res.status(401).json({error: new Error('Wrong OTP')});
          }
        }
        // Call to check the validity of the user input OTP, if verified the user is returned
        otpService.verifyOtp(email, otp, onVerification)
        
    } else {
        res.status(401).json({error: new Error('Email or otp is missing')});
    }
});

module.exports = router;
