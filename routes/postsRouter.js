const express = require('express');
postsRouter = express.Router();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 

postsRouter.use(flash());
postsRouter.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
postsRouter.use(express.urlencoded( { extended : false } )); 
postsRouter.use(passport.initialize());
postsRouter.use(passport.session());

async function createPost(data) {
    
    //await createDocument('posts', data);
}

async function findUserByKey(key, value) {
    return await findDocument('post', key, value);
}

postsRouter.get('/post', (req, res) => {
    const user = req.session.passport.user;
    

    res.render('post.ejs');
}); 

postsRouter.post('/post', (req, res) => {
    
});

module.exports = postsRouter;