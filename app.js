const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//setting a view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
//initialize passport for session-cookie
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB cloud
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create a home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(3000, () => {
    console.log("Listening to request");
});