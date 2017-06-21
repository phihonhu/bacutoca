var express = require('express')
var app = express()
var Promise = require("bluebird");
var db = require('./dbService');
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Ajinomoto!')
});

app.post('/login', function (req, res) {
  var request = req.body;
  var params = [];
  params.push(request.username);
  db.get("select * from users where username=?", params)
    .then(function (user) {
      if (user) {
        res.status(200).send(user);
      } else {
        db.run("INSERT INTO users ('username') values(?)", params)
          .then(function (newUser) {
            res.status(200).send(
              {
                id: newUser.lastID,
                username: request.username
              }
            );
          });
      }
    }).catch(function () {
      res.status(422).send({
        message: '1 lỗi xảy ra'
      });
    });
});

app.get('/install', function (req, res) {
  console.log('Creating users table!');
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY   AUTOINCREMENT, username TEXT UNIQUE)");
  res.send('Nhanh như cái mũ!');
});


app.listen(3000, function () {
  console.log('Bacutoca is listening on port 3000!');
})