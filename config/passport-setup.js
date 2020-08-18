const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    //options for strategy
    callbackURL: 'http://localhost:3000/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport use here
    console.log(profile);
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            console.log('user already existed:', currentUser);
            done(null, currentUser);
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.picture
            }).save().then((result) => {
                console.log('new created user:' + result);
                done(null, result);
            })
        }
    });

}));