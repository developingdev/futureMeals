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
  if (req.cookies.futureMeals) {
    db.connections.Session.findOne({
      where: {
        uid: req.cookies.futureMeals
      }
    }).then((result) => {
      if (result !== null) {
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
  db.connections.Session.findOne({
    where: {
      uid: req.body.id
    }
  }).then((result) => {
    if (result !== null) {
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
      });
    }
  });
};

module.exports = sessionController;
