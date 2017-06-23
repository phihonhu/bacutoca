var express = require('express');
var app = express();
var Promise = require('bluebird');
var db = require('./dbService');
var bodyParser = require('body-parser');
var engine = require('consolidate');
var cors = require('cors');
var md5 = require('ts-md5/dist/md5');
var pusher = require('./pusherService');
var sleep = require('system-sleep');

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.render('index');
});

// create game
app.post('/game', function (req, res) {
  var request = req.body;

  var name = request.name;
  var creatorId = parseInt(request.creatorId);
  var createdAt = getCurrentDateTime();

  db.get('select * from game where lower(name)=?', name.toLowerCase())
    .then(function (game) {
      if (game) {
        res.status(422).send({
          'message': 'The name you entered already exists.'
        });
      } else {
        var params = [];
        params.push(name, creatorId, createdAt);
        db.run('INSERT INTO game (\'name\', \'creator_id\', \'created_at\') values(?, ?, ?)', params)
          .then(function (game) {
            console.log('New game ' + game.lastID + ' has been created.');
            res.status(200).send({
              id: game.lastID
            });
          });
      }
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while creating game.'
      });
    });
});

// join a game
app.post('/game/:id/join', function (req, res) {
  var userId = req.body.userId;
  var gameId = req.params.id;
  var attended_at = new Date();

  db.get('select * from game_player where user_id=? and game_id=?', [userId, gameId])
    .then(function (game) {
      if (game) {
        res.status(422).send({
          'message': 'UserID ' + userId + ' has already joined game ' + gameId
        });
      } else {
        var params = [];
        params.push(gameId, userId, attended_at);
        db.run('INSERT INTO game_player (\'game_id\', \'user_id\', \'attended_at\') values(?, ?, ?)', params)
          .then(function (game) {
            console.log('UserID ' + userId + ' has joined game ' + gameId);
            res.status(200).send({ gameId, userId, attended_at });
          }).catch(function (error) {
            res.status(422).send({
              'message': 'An error has occurred while joining game.'
            });
          });
      }
    }).catch(function (error) {
      console.log(JSON.stringify(error));
      res.status(422).send({
        'message': 'An error has occurred while joining game.'
      });
    });
});

// leave game
app.post('/game/:id/leave', function (req, res) {
  var userId = req.body.userId;
  var gameId = req.params.id;

  sleep(5000);

  var params = [userId, gameId];
  db.run('DELETE from game_player where user_id=? and game_id=?', params)
    .then(function (game) {
      console.log('UserID ' + userId + ' has joined game ' + gameId);
      res.status(200).send({ gameId, userId });
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while leaving game.'
      });
    });

});

// get game results
app.get('/game/:id', function (req, res) {
  db.get(`select g.*, u.username from game as g
            join user as u on g.creator_id = u.id
            where g.id = ?`, req.params.id)
    .then(function (game) {
      res.status(200).send(game);
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while getting game result.'
      });
    });
});

app.get('/game/:id/player', function (req, res) {
  db.all(`select u.* from game_player as gp
            join user as u on gp.user_id = u.id
            where gp.game_id = ?`, req.params.id)
    .then(function (players) {
      res.status(200).send(players);
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while getting players of game ' + req.params.id
      });
    });
});

// get games
app.get('/game', function (req, res) {
  db.all(`select g.*, u.username from game as g
            join user as u on g.creator_id = u.id`)
    .then(function (games) {
      res.status(200).send(games);
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while getting game result.'
      });
    });
});

app.get('/user/:id/games-joined', function (req, res) {
  db.all(`select g.*, u.username from game_player as gp
            join user as u on gp.user_id = u.id
            join game as g on gp.game_id = g.id
            where user_id=?`, [req.params.id])
    .then(function (games) {
      res.status(200).send(games);
    }).catch(function (error) {
      console.log(JSON.stringify(error));
      res.status(422).send({
        'message': 'An error has occurred while getting game joined for user ' + req.params.id
      });
    });
});

// place bet
app.post('/game/bet', function (req, res) {
  var request = req.body;

  var userId = parseInt(request.userId);
  var roundId = parseInt(request.roundId);
  var betIconic = parseInt(request.betIconic);
  var betAmount = parseInt(request.betAmount);

  db.get('select * from user where id=?', userId)
    .then(function (user) {
      if (!user) {
        return res.status(422).send({
          'message': 'user not found.'
        });
      } else {
        if (user.balance < request.betAmount) {
          return res.status(422).send({
            'message': 'not enough amount in balance.'
          });
        }
        var params = [];
        params.push(userId, roundId, betIconic, betAmount);
        db.run('INSERT INTO bet (\'user_id\', \'round_id\', \'bet_iconic\', \'bet_amount\') values(?, ?, ?, ?)', params)
          .then(function (betSlip) {
            db.run('update user set balance = balance - ? where id = ?', [betAmount, userId]);
            res.status(200).send(
              {
                betId: betSlip.lastID,
                betIconic: betIconic,
                newBalance: user.balance - betAmount
              }
            );
          });
      }
    }).catch(function (err) {
      console.log(err);
      res.status(422).send({
        'message': 'An error has occurred'
      });
    });
});

// update balance of a specific user
app.post('/user/:username/balance', function (req, res) {
  var request = req.body;
  var userName = req.params.username;
  var balance = parseInt(request.balance);

  db.get('select * from user where username=?', userName)
    .then(function (user) {
      if (!user) {
        return res.status(422).send({
          'message': 'user not found.'
        });
      } else {
        var newBalance = user.balance = user.balance + balance;
        db.run('update user set balance = ? where username = ?', [newBalance, userName]);
        res.status(200).send(
          {
            userName: userName,
            newBalance: newBalance
          }
        );
      }
    }).catch(function (err) {
      console.log(err);
      res.status(422).send({
        'message': 'An error has occurred'
      });
    });
});

// get betting history of a specific user
app.get('/user/:username/history', function (req, res) {
  var request = req.body;
  var userName = req.params.username;

  db.all(`select game.name as game, 
          round.name as round, 
          bet.bet_iconic as betIconic, 
          bet.bet_amount as betAmount,
          (case bet.bet_iconic when round.result1 then bet.bet_amount else 0 end)
          + (case bet.bet_iconic when round.result2 then bet.bet_amount else 0 end)
          + (case bet.bet_iconic when round.result3 then bet.bet_amount else 0 end)
          + (case bet.bet_iconic 
              when round.result1 then 0 
              when round.result2 then 0 
              when round.result3 then 0 
              else -bet.bet_amount 
            end)
          as win          
          from user
          left join bet on bet.user_id = user.id
          left join game_player gp on gp.user_id = user.id
          left join game on game.id = gp.game_id
          inner join round on round.game_id = game.id and round.id = bet.round_id
          where username = ?
          order by game.name, round.name;`, userName)
    .then(function (history) {
      if (!history) {
        return res.status(422).send({
          'message': 'There is no betting history.'
        });
      } else {
        res.status(200).send(history);
      }
    }).catch(function (err) {
      console.log(err);
      res.status(422).send({
        'message': 'An error has occurred'
      });
    });
});

// Randomize game results 
app.post('/round/:id/result', function (req, res) {
  var request = req.body;
  var roundId = parseInt(req.params.id);

  db.get('select * from round where id=?', roundId)
    .then(function (round) {
      if (round) {
        if ((round.result1 !== null && round.result2 !== null && round.result3 !== null)) {
          return res.status(422).send({
            message: 'the requested game is finished'
          });
        }

        var params = [];
        var result1 = getRandomMinMax(0, 5);
        var result2 = getRandomMinMax(0, 5);
        var result3 = getRandomMinMax(0, 5);

        params.push(result1);
        params.push(result2);
        params.push(result3);
        params.push(roundId);

        db.run('UPDATE round SET result1 = ?, result2 = ?, result3 = ? where id = ?', params)
          .then(function (game) {
            console.log('Result of game ' + game.lastID + ' has been updated.');

            return db.all('select * from bet where round_id = ? and (bet_iconic = ? or bet_iconic = ? or bet_iconic = ?)', [roundId, result1, result2, result3])
              .then(function (slips) {
                slips.forEach(function (slip) {
                  db.run('UPDATE user SET balance = balance + (? * 2) where id = ?', [slip.bet_amount, slip.user_id]);
                });
                var ret = {
                  id: roundId,
                  result1: result1,
                  result2: result2,
                  result3: result3,
                };

                pusher.emit('game-' + round.game_id, 'round_ended', ret);

                res.status(200).send(ret);
              });

          });
      } else {
        res.status(404).send(
          {
            message: 'game not found'
          });
      }
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while updating result of game .' + gameId
      });
    });
});

// get all players 
app.get('/getallplayers', function (req, res) {
  db.all('select * from user')
    .then(function (users) {
      res.status(200).send(users);
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while getting player.'
      });
    });
});

// get user by name
app.get('/user/:username', function (req, res) {
  db.get('select * from user where lower(username)=?', req.params.username)
    .then(function (user) {
      res.status(200).send(user);
    }).catch(function (error) {
      res.status(422).send({
        'message': 'An error has occurred while getting user.'
      });
    });
});

// register 
app.post('/register', function (req, res) {
  var request = req.body;

  var username = request.username.replace(/ /g, '').toLowerCase();
  var password = request.password;

  if (username === '' || password === '') {
    return res.status(422).send({
      'message': 'username and password are required'
    });
  }

  var params = [];
  params.push(username);
  db.get('select * from user where lower(username)=?', params)
    .then(function (user) {
      if (user) {
        res.status(422).send({
          'message': 'The name you entered already exists.'
        });
      } else {
        password = md5.Md5.hashStr(`${username}${password}`);
        var createdAt = getCurrentDateTime();
        var balance = 1000;
        params.push(password, balance, createdAt);
        db.run('INSERT INTO user (\'username\', \'password_hash\', \'balance\', \'created_at\') values(?, ?, ?, ?)', params)
          .then(function (newUser) {
            console.log('User ' + request.username + ' has been created.');
            res.status(200).send(
              {
                id: newUser.lastID,
                username: request.username,
                balance: 1000 //new user will receive 1000 points in balance
              }
            );
          });
      }
    }).catch(function () {
      res.status(422).send({
        'message': 'An error has occurred'
      });
    });
});

// login
app.post('/login', function (req, res) {
  var request = req.body;
  var username = request.username.replace(/ /g, '').toLowerCase();
  var password = request.password;

  if (username === '' || password === '') {
    return res.status(422).send({
      'message': 'username and password are required'
    });
  }

  var params = [];
  params.push(username);
  password = md5.Md5.hashStr(`${username}${password}`);
  params.push(password);
  db.get('select * from user where username=? and password_hash=?', params)
    .then(function (user) {
      if (user) {
        res.status(200).send(user);
        console.log('User ' + request.username + ' has just logged in.');
      } else {
        res.status(422).send({
          //'message': 'User name or password is incorrect does not exist. Please register a new one !'
          'message': 'User name or password is incorrect.'
        });
      }
    }).catch(function () {
      res.status(422).send({
        'message': 'An error has occurred'
      });
    });
});

// create a game round
app.post('/game/:id/round', function (req, res) {
  //var name = req.body.name;
  var gameId = req.params.id;
  // var result1 = req.body.result1;
  // var result2 = req.body.result2;
  // var result3 = req.body.result3;
  var endTime = getCurrentTimestamp() + 120;  

  db.get(`select 'ROUND ' || cast(count(*) + 1 as text) as name from round where game_id=?`, gameId)
    .then(function (round) {      
      if (round) {
        var name = round.name;
        console.log(`Created round: ${name}`);
        var params = [];
        params.push(name, gameId, endTime);
        db.run('INSERT INTO round(\'name\', \'game_id\', \'end_time\') values(?, ?, ?)', params)
          .then(function (newRound) {
            console.log(`The round name ${name} with id ${newRound.lastID} of the game has been created.`);
            var ret = {
              id: newRound.lastID,
              name: name,
              endTime: endTime
            };
            pusher.emit('game-' + gameId, 'new_round_started', ret);
            res.status(200).send(ret);
          });
      }
    }).catch(function (error) {
      console.log(JSON.stringify(error));
      res.status(422).send({
        'message': 'An error has occurred while creating game round.'
      });
    });
});

// installing database stuff
app.get('/install', function (req, res) {
  db.run('DROP TABLE IF EXISTS user')
    .then(function () {
      return db.run('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT, balance INTEGER, created_at DATETIME);');
    })
    .then(function () {
      return db.run('DROP TABLE IF EXISTS game');
    }).then(function () {
      return db.run('CREATE TABLE game (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, creator_id INTEGER, created_at DATETIME);');
    }).then(function () {
      return db.run('DROP TABLE IF EXISTS game_player');
    }).then(function () {
      return db.run('CREATE TABLE game_player (game_id INTEGER REFERENCES game (id) ON DELETE CASCADE, user_id INTEGER REFERENCES user (id) ON DELETE CASCADE, attended_at DATETIME);');
    }).then(function () {
      return db.run('DROP TABLE IF EXISTS round');
    }).then(function () {
      return db.run('CREATE TABLE round (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, game_id REFERENCES game (id) ON DELETE CASCADE, result1 INTEGER, result2 INTEGER, result3 INTEGER, end_time DATETIME);');
    }).then(function () {
      return db.run('DROP TABLE IF EXISTS bet');
    }).then(function () {
      return db.run('CREATE TABLE bet (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER REFERENCES user (id) ON DELETE CASCADE, round_id INTEGER REFERENCES round (id) ON DELETE CASCADE, bet_iconic INTEGER, bet_amount INTEGER);');
    }).then(function () {
      return res.send('fast like a hat');
    }).catch(function (error) {
      console.log(error);
      res.status(422).send({ error: error });
    });
});

function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}
function getRandomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentDateTime() {
  var d = new Date();
  return d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " "
    + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
}

app.listen(8081, function () {
  console.log('BACUTOCA server is listening on port 8081...');
});


