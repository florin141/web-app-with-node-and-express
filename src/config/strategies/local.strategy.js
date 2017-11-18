var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
  }, function (username, password, done) {
      var user = {
          username: password,
          password: password
      };
      done(null, user);
  }));
};