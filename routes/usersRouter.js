const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersRouter = express.Router();


//Mongo methods
const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 

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



async function createUser(data) {
    await createDocument('users', data);
}

async function findUserByKey(key, value) {
    return await findDocument('users', key, value);
}

//findUser('Bill');
//createUser({ name : 'Bill', email : 'sleepyBill@email', password : 'pinetree', dateCreated: Date.now() });


usersRouter.get('/', (req, res) => {
    res.render('index.ejs');
});

usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', { message: '' });
}); 

usersRouter.post('/login', (req, res) => {
    async function login() {
        try {
            let userEmail = req.body.email;
            user = await findUserByKey('email', userEmail);
        } catch {
            console.log('Could not connect to database.');
        }

        if (!user) {
            console.log('Could not find email address in database.');
            res.render('login.ejs', { message: 'Could not find email address in database.' });
            return;
        }
        if (user.password !== req.body.password) {
            console.log('Incorrect password.');
            res.render('login.ejs', { message: 'Incorrect password.' });
            return;
        }
        console.log('Credentials validated, login will commence!');
        res.redirect('/');
    }
    login();
});

function initialisePassport(passport, getUserByKey) {

}

usersRouter.get('/register', (req, res) => {
    res.render('register.ejs'); 
});

usersRouter.post('/register', (req, res, next) => {
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

module.exports = usersRouter;