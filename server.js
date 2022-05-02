var express = require('express');
var app = express();
var mongoose = require('mongoose');
var crypto = require('crypto');
const cors = require('cors');
const passport = require("passport");
const bodyParser = require("body-parser");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  username: String,
  password: String
});
module.exports = UserModel = mongoose.model('UserModel', UserSchema );

mongoose.connect('mongodb://localhost:27017/todoDatabase', {useNewUrlParser: true, useUnifiedTopology: true});
var mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, "MongoDB connection error:"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./passport")(passport);

app.get('/', function (req, res) {
    res.send('asdfasdf');
})
app.post('/signup', function (req, res) {
    var values = req.body;
    UserModel.create({email: values.email, username: values.username, password: crypto.createHash('md5').update(values.password).digest('hex') },
        function(err, newUser) {
            console.log(newUser);
            if(err)    return handleError(err)
    });
    res.end('Welcome to JavaTpoint');
});

app.post('/login', function (req, res) {
    UserModel.findOne({email: req.body.email, password: crypto.createHash('md5').update(req.body.password).digest('hex') })
    .then(user => {
      if (user) {
        return res.json({'username': user['username']});
      }
      res.json({'Error':'Incorrect Email or password.'});
    })
    .catch(err => console.log(err));
});

var server = app.listen(8000, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("Example app listening at http://%s:%s", host, port)  
})  