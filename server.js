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

const usersRouter = express.Router();
app.use('/', usersRouter);

usersRouter.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
}); 

app.post('/login', (req, res) => {
    if (tempUsers.find(user => req.body.email === user.email) && tempUsers.find(user => req.body.password === user.password)) {
        const userFound = 'yes';
        console.log('yes');
    } else {
        console.log('no');
    }
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', (req, res, next) => {
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

app.listen(PORT, () => {
    console.log('The server for complaing your life away has begun..');
});