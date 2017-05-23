const sessionController = {
};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = () => {
  // sessions.find() if exists redirect // if not new session
  // Session.findOne({cookieId: id}, (err,session) => {
  //   console.log('this is session:', session)
  //   if(!session){
  //     const sessions = new Session({ cookieId: id });
  //     sessions.save((err) => {
  //       if (err) throw err;
  //       console.log('in session login save', sessions);
  //     });
  //   }
  //   else return true;
  // })
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res, next) => {
  // const session = new Session({ cookieId: req.body._id });
  // session.save((err) => {
    // do something check if its working.
    // next();
  // });
};

module.exports = sessionController;
