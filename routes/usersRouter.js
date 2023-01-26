const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const usersRouter = express.Router();
const methodOverride = require('method-override');
const initialisePassport = require('./passport-config.js');

//TODO List
// * encryt passwords in database 
// * Verify email (nodemailer?)
// * Forgot password 
// * User details edit 
// * Delete your account 
// * Post count per user


//Importing my middleware
const checkAuthenticated = require('./authenticationMiddleware.js').checkAuthenticated 
const checkNotAuthenticated = require('./authenticationMiddleware.js').checkNotAuthenticated 

//Mongo methods and functions
const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 
const findLatestSevenPosts = require('../mongoCRUD.js').findLatestSevenPosts;


async function createUser(data) {
    await createDocument('users', data);
}

async function findUserByKey(key, value) {
    return await findDocument('users', key, value);
}

//findUser('name', 'Bill');
//createUser({ name: 'Bill', email: 'sleepyBill@email', password: 'pinetree', dateCreated: Date.now() });

initialisePassport(
    passport, 
    findUserByKey
);

//Using packages on the router
usersRouter.use(flash());
usersRouter.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
usersRouter.use(express.urlencoded( { extended : false } )); 
usersRouter.use(passport.initialize());
usersRouter.use(passport.session());
usersRouter.use(methodOverride('_method'));



//login rest methods 
usersRouter.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', { message: '' });
}); 

usersRouter.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

//register methods 
usersRouter.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs'); 
});

usersRouter.post('/register', checkNotAuthenticated, (req, res, next) => {
    try {
        const currentDate = new Date;
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dateCreated: currentDate
        }
        console.log('The email attempting to be registered is ' + user.email);
        
        async function checkForRegistration() {
            let alreadyRegistered;
            alreadyRegistered = await findUserByKey('email', user.email);
            if (alreadyRegistered) {
                console.log('The email address ' + user.email + ' is already registered.');
                res.render('login.ejs', { message: 'That email address was already registered, try log on.' });
                return;
            }
            if (!alreadyRegistered) {
                await createUser(user);
                res.render('login.ejs', { message: 'You have registered successfully, you can now log in.' });
                return;
            } 
        }
        checkForRegistration();
        
    } catch(err) {
        console.log(err);
        res.redirect('/register');
    }
}); 

//logout method 
usersRouter.delete('/logout', (req, res) => {
    req.logOut( err => {
        if (err) { return next(err) }
        res.redirect('/'); 
    }); 
});

module.exports = usersRouter;