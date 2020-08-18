const passport = require('passport');
const passportFacebook = require('passport-facebook');

const FacebookStrategy = passportFacebook.Strategy;

const strategyOptions = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:4000/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'emails'],
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log('profile:', profile);

  // TODO create/fetch user
  const user = { id: '12345' };

  // TODO error handling

  done(null, user);
};

passport.use(new FacebookStrategy(strategyOptions, verifyCallback));

exports.authenticateFacebook = passport.authenticate('facebook', { scope: ['email'] });

(exports.authenticateFacebookCallback = passport.authenticate('facebook', {
  session: false,
  successRedirect: '/',
  failureRedirect: '/login',
})),
  (req, res) => {
    return res.status(200).redirect('/');
  };
