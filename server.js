const express = require('express');
const app = express();

const PORT = process.env.PORT || 1001; 

//allows express to render ejs views
app.set('view-engine', 'ejs');
//allows the use of static files in views like my style.css etc.
app.use('/views', express.static('views')); 

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
}); 

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.listen(PORT, () => {
    console.log('The server for complaing your life away has begun..');
});