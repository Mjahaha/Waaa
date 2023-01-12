const express = require('express');
const usersRouter = express.Router();
usersRouter.use(express.urlencoded( { extended : false } )); 

//Mongo methods
const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 


async function createUser(data) {
    await createDocument('users', data);
}

async function findUser(value) {
    await findDocument('users', 'name', value);
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
        console.log('started register');
        const currentDate = new Date;
        console.log(currentDate);
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dateCreated: currentDate
        }
        
        console.log(user);
        
        if (!findUser(user.name)) {
            createUser(user);
        } else {
            console.log('The email address ' + user.email + ' is already registered.');
            return;
        }

        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

module.exports = usersRouter;