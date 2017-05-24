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
<<<<<<< HEAD
    console.log('userController.verifyUser');
    // db.conn.query(`SELECT username, password FROM users WHERE username = '${username}';`,
    //   (error, result) => {
    //     if (error) res.send(error);
    //     else if (!result.rows.length) res.status(400).send('no username found');
    //     else {
    //       bcrypt.compare(password, result.rows[0].password).then((isSame) => {
    //         if (isSame) {
    //           res.status(200).send('password matches');
    //         } else {
    //           res.status(401).send('wrong password');
    //         }
    //       });
    //     }
    //   });
=======
    db.connections.User.findAll({
      where: {
        username: username
      }
    }).then((error, result) => {
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
>>>>>>> af323d6084f5bdd8abee8fbbda1458d95e6e5752
  }
};

// POST REQUEST FROM SIGNUP:
// checks if username already exists in users table
// if username already exists, don't create new user
userController.checkIfUsernameExists = (req, res, next) => {
  const username = req.body.username;
<<<<<<< HEAD
  console.log('userController.checkIfUsernameExists');
  next();
  // db.conn.query(`SELECT username FROM users WHERE username = '${username}';`,
  //   (error, result) => {
  //     if (result.rows.length) res.status(400).send('username exists already');
  //     else next();
  //   });
=======
  console.log(db.connections)
  db.connections.User.findAll({
    where: {
      username: username
    }
  }).then((err,users)=>{
    if (err) next();
  });
>>>>>>> af323d6084f5bdd8abee8fbbda1458d95e6e5752
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
<<<<<<< HEAD
    // db.conn.query(`INSERT INTO users ("username", "password", "healthlabel")
    //                VALUES ('${username}', '${hash}', ARRAY['${healthlabel}']);`,
    //   (error, result) => {
    //     console.log(error)
    //     console.log(result)
    //     if (error){ res.status(400).send(error); console.log("TWO")}

    //     else next();
    //   });
  });
};

// POST REQUEST FROM SIGNUP (CONTINUED):
// create table for each new user when they sign up
userController.createUserTable = (req, res, next) => {
  const username = req.body.username;
  console.log("IN CREATE TABLE");

  // db.conn.query(`CREATE TABLE ${username} (
  //                   "_id" SERIAL PRIMARY KEY NOT NULL,
  //                   "day" TEXT,
  //                   "label" TEXT,
  //                   "image" TEXT,
  //                   "url" TEXT,
  //                   "yield" INT,
  //                   "healthLabels" TEXT[],
  //                   "ingredientLines" TEXT[]
  //                );`,
  //   (error, result) => {
  //     if (error) res.status(400).send(error);
  //     else res.status(200).send('created new table for new user');
  //   });
=======
    db.connections.User.create({
      username,
      password : hash,
      healthlabel
    }).then( (user) => {
        res.status(200);
        res.end();
    });
  });
>>>>>>> af323d6084f5bdd8abee8fbbda1458d95e6e5752
};

module.exports = userController;
