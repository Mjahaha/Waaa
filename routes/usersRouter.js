const express = require('express');
const usersRouter = express.Router();
const createDocument = require('../mongoCRUD.js')


async function createUser(data) {
    await createDocument('myCollection', data);
}

createUser({ name : 'Joseph Campbell', email : 'joeDawg@gmail.com', password : 'ilovebigtitties'});

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
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        console.log(user);
        tempUsers.push(user);
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

module.exports = usersRouter;