const db = require('../models/database');
const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/

// TO DO - IS LOGGED IN NEEDS TO CHANGE STATE
sessionController.isLoggedIn = (req, res, next) => {
  console.log('COOKIES:', req.cookies)
  if (req.cookies.futureMeals) {
    db.connections.Session.findOne({
      where: {
        uid: req.cookies.futureMeals
      }
    }).then((result) => {
      console.log('IS LOGGED IN', result);
      if (result !== null) {
        console.log('RESULT IS NOT NULL')
        res.status(200);
        res.end();
      } else {
        res.status(400);
        res.end();
      }
    });
  } else {
    res.status(400);
    res.end();
  }
};

/**
* startSession - create a new Session and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res, next) => {
  console.log('COOKIES:', req.cookies)
  console.log('in startSession', req.body);
  db.connections.Session.findOne({
    where: {
      uid: req.body.id
    }
  }).then((result) => {
    console.log('in startSession', result);
    if (result !== null) {
      console.log('NOT NULL');
      db.connections.Session.update({
        createdAt: Date.now(),
        updatedAt: Date.now()
      }, {
        where: {
          uid: req.body.id
        }
      }).then(() => {
        next();
      })
    } else {
      db.connections.Session.create({uid: req.body.id}).then((user) => {
        next();
        // res.status(200);
        // res.end();
      });
    }
  });
};

module.exports = sessionController;
