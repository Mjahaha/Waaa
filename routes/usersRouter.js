const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const usersRouter = express.Router();
usersRouter.use(express.urlencoded( { extended : false } )); 

//Mongo methods
const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 

usersRouter.use(flash());
usersRouter.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


async function createUser(data) {
    await createDocument('users', data);
}

async function findUserByEmail(value) {
    return await findDocument('users', 'email', value);
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
            user = await findUserByEmail(userEmail);
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
        //TODO 12/01/2023
        //Make login session happen
        //TODO
        console.log('Credentials validated, login will commence!');
        res.redirect('/');
    }
    login();
});

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
            alreadyRegistered = await findUserByEmail(user.email);

            if (!alreadyRegistered) {
                await createUser(user);
                res.redirect('/login');
            } else {
                //TODO 12/01/2023
                //show a message that the user is already registered
                //TODO
                console.log('The email address ' + user.email + ' is already registered.');
                res.redirect('/login');
            }
        }
        checkForRegistration();
        
    } catch(err) {
        console.log(err);
        res.redirect('/register');
    }
});

module.exports = usersRouter;