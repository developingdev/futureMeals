const db = require('../models/database');
const bcrypt = require('bcrypt');

const userController = {};
// require user model here later
// ^^^ didnt actually use sequilize. did it raw6969

// POST REQUEST FROM LOGIN:
// verify that username enters username and password
// verify that username exists in users table
// verify that password matches
userController.verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) res.status(401).send('Please, enter username AND password');
  else {
    db.conn.query(`SELECT username, password FROM users WHERE username = '${username}';`,
      (error, result) => {
        if (error) res.send(error);
        else if (!result.rows.length) res.status(400).send('no username found');
        else {
          bcrypt.compare(password, result.rows[0].password).then((isSame) => {
            if (isSame) {
              res.status(200).send('password matches');
            } else {
              res.status(401).send('wrong password');
            }
          });
        }
      });
  }
};

// POST REQUEST FROM SIGNUP:
// checks if username already exists in users table
// if username already exists, don't create new user
userController.checkIfUsernameExists = (req, res, next) => {
  const username = req.body.username;
  console.log(db.connections)
  db.connections.User.findAll({
    where: {
      username: username
    }
  }).then((err,users)=>{
    if (err) next();
  });
};

// POST REQUEST FROM SIGNUP (CONTINUED):
// adds username to users table
userController.addToUsersTable = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let healthlabel = '';
  // yeah Alyssa did this. goodluck figuring out why. sorrynotsorry
  if (req.body.healthlabel) {
    healthlabel = req.body.healthlabel.reduce((res, curr, i) => {
      res += curr;
      if (i < req.body.healthlabel.length - 1) res += ', ';
      return res;
    }, '');
  }

  bcrypt.hash(password, 10).then((hash) => {
    // Store hash in your password DB.
    console.log('Orignal PW: ', password);
    console.log('Encrypted PW: ', hash);
    db.connections.User.create({
      username,
      password : hash,
      healthlabel
    }).then( (err, user) => {
      if (err) return new Error(err);
      else res.send(200);
    });
  });
};

module.exports = userController;
