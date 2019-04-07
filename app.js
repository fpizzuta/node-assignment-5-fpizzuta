var express = require('express');

var app = express();
var users = require('./routes/users');
var login = require('./routes/login');
var posts = require('./routes/posts');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const apiposts = require('./routes/api/api.posts');
const mongoose = require('mongoose');
// var flash = require('connect-flash');
require('dotenv').config();


mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-wjugr.mongodb.net:27017,cluster0-shard-00-01-wjugr.mongodb.net:27017,cluster0-shard-00-02-wjugr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`)
  .catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
  });

 
// app.use(flash()); 
app.use(cookieParser('cscie31-secret'));
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.set('views', './views');    // tells express where to find the views
app.set('view engine', 'pug');  // tells express to use pug as the template engine

app.use('/delete', posts);
app.use('/newpost', posts);
app.use('/edit', posts);
app.use('/posts', posts);
app.use('/create', posts);
app.use('/users', users);
app.use('/user', users);
app.use('/login', login);
app.use('/', login);

app.use('/api/posts', apiposts);

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('./public'));
// app.use('/static', express.static('./public'));

app.use((req, res, next)=>{
  res.status(404);
  res.send("404 Sorry, this file cannot be found");
});


module.exports = app;