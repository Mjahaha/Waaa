const express = require('express');
const app = express(); 
const passport = require('passport');

const PORT = process.env.PORT || 1001; 
const tempUsers = [  ];

//allows express to render ejs views
app.set('view-engine', 'ejs');
//allows the use of static files in views like my style.css etc.
app.use('/views', express.static('views')); 
//allows us to use the variables from our form in our server methods (ie POST)
app.use(express.urlencoded( { extended : false } )); 


//bringing in and using our Router files 
const usersRouter = require('./routes/usersRouter.js');
app.use('/', usersRouter);
const postsRouter = require('./routes/postsRouter.js'); 
app.use('/', postsRouter); 
const loadRouter = require('./routes/loadRouter.js');
app.use('/', loadRouter);

app.listen(PORT, () => {
    console.log('The server for complaing your life away has begun..');
});