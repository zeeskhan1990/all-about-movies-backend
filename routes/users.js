const express = require('express');
const User = require('../models/user');
const auth = require("../auth")(); 

const router = express.Router();

/* GET users listing. */
router.get('/currentuser', auth.authenticate(),  function(req, res) {
  res.json(req.user);
});

router.post('/logout', auth.authenticate(), function(req, res, next) {
  User.findOneAndUpdate({email: req.user.email}, {isLoggedIn: false}, (err, user) => {
      if(err)
          return next(err);
  });
})

module.exports = router;
