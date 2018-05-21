const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const { createHash } = require('crypto');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

passport.use(new LocalStrategy(((username, password, done) => {
  const passwordHash = createHash('sha512').update(password).digest('hex');
  const user = users.find(oneUser =>
    oneUser.username === username && oneUser.password === passwordHash);
  if (!user) {
    done(null, false);
  } else {
    done(null, user);
  }
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
