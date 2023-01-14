const express = require('express');
const app = express(); 

const PORT = process.env.PORT || 1001; 
const tempUsers = [  ];

//allows express to render ejs views
app.set('view-engine', 'ejs');
//allows the use of static files in views like my style.css etc.
app.use('/views', express.static('views')); 
//allows us to use the variables from our form in our server methods (ie POST)
app.use(express.urlencoded( { extended : false } )); 


const usersRouter = require('./routes/usersRouter.js');
app.use('/', usersRouter);



app.listen(PORT, () => {
    console.log('The server for complaing your life away has begun..');
});