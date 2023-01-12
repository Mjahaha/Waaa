const express = require('express');
const usersRouter = express.Router();
usersRouter.use(express.urlencoded( { extended : false } )); 

//Mongo methods
const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 


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
    res.render('login.ejs');
}); 

usersRouter.post('/login', (req, res) => {
    async function login() {
        let user;
        user = await findUserByEmail(user.email);
    }
    if (tempUsers.find(user => req.body.email === user.email) && tempUsers.find(user => req.body.password === user.password)) {
        const userFound = 'yes';
        console.log('yes');
    } else {
        console.log('no');
    }
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