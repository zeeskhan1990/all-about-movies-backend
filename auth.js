const passport = require("passport");  
const passportJWT = require("passport-jwt");  
//const users = require("./users.js");  
const config = require('./config/main');
const User = require('./models/user');
const ExtractJwt = passportJWT.ExtractJwt;  
const Strategy = passportJWT.Strategy; 
 
const params = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
    const strategy = new Strategy(params, function(payload, done) {
        User.findOne({email: payload.email}, (err, user) => {
            if (user) {
                return done(null, {
                    email: user.email
                });
            } else {
                return done(new Error("User not found"), null);
            }
        });
    });

    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};