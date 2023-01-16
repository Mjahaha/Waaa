const express = require('express');
postsRouter = express.Router();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

//Importing my middleware
const checkAuthenticated = require('./authenticationMiddleware.js').checkAuthenticated
const checkNotAuthenticated = require('./authenticationMiddleware.js').checkNotAuthenticated

//Mongo methods and functions
const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 

async function createPost(data) {
    await createDocument('posts', data);
}

async function findPostByKey(key, value) {
    return await findDocument('post', key, value);
}

//createPost({ userId:'jibberish', postText: 'I am so angry about this issue. Why does it suck so much?', dateCreated: '2023-01-12T00:53:43.192Z' });


postsRouter.use(flash());
postsRouter.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
postsRouter.use(express.urlencoded( { extended : false } )); 
postsRouter.use(passport.initialize());
postsRouter.use(passport.session());

postsRouter.get('/post', checkAuthenticated, (req, res) => {
    res.render('post.ejs');
}); 

postsRouter.post('/post', checkAuthenticated, (req, res) => {
    const userId = req.session.passport.user;
    const currentDate = new Date;
    const postObject = {
        postText: req.body.post,
        userId: userId,
        dateCreated: currentDate
    };
    createPost(postObject);
});

module.exports = postsRouter;