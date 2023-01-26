const express = require('express');
const loadRouter = express.Router();

loadRouter.use(express.urlencoded( { extended : false } )); 


//Mongo methods and functions
const createDocument = require('../mongoCRUD.js').createDocument; 
const findDocument = require('../mongoCRUD.js').findDocument; 
const findLatestSevenPosts = require('../mongoCRUD.js').findLatestSevenPosts;


async function findUserByKey(key, value) {
    return await findDocument('users', key, value);
}

//load posts onto the feed
const  loadFeedResults = async () => {
    const feedResults = await findLatestSevenPosts();
    let element = '';
    feedResults.forEach( post => {
        element += '<div class="post"><div class="post-text"><h4>Posted by @';
        element += post.userName;
        element += '</h4><p>';
        element += post.postText;
        element += '</p><p>Waaa 3.7   Care 2.1   Fix 9.8</p></div><div class="rate">Rate</div></div>';
    });
    return element;
}

//index methods
loadRouter.get('/', async (req, res) => {
    let userId;
    let user = {}; 

    await loadFeedResults();

    //load page with different variables if user is logged in
    if (req.isAuthenticated()) {
        userId = req.session.passport.user;
    }
    if (userId) {
        user = await findUserByKey('_id', userId);
        res.render('index.ejs', { name: user.name, element: await loadFeedResults(), loadFeedResults });
    } else {
        res.render('index.ejs', { name: null, element: await loadFeedResults(), loadFeedResults });
    }
    
}); 

loadRouter.get('/morePosts', async (req, res, next) => {
    const morePosts = await loadFeedResults();
    res.status(200).send(morePosts);
});

module.exports = loadRouter;