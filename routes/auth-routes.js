const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logOut();
    res.redirect('/');
});

//auth using google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//route for redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //  res.send('REACHED THE CALLBACK URL');
    res.redirect('/profile/');
})

module.exports = router;