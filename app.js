var express = require('express');

var app = express();
var users = require('./routes/users');
var login = require('./routes/login');

app.set('views', './views');    // tells express where to find the views
app.set('view engine', 'pug');  // tells express to use pug as the template engine

app.use('/users', users);
app.use('/user', users);
app.use('/login', login);
app.use('/', login);

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('./public'));
// app.use('/static', express.static('./public'));

app.use((req, res, next)=>{
  res.status(404);
  res.send("404 Sorry, this file cannot be found");
});


module.exports = app;