const cookieController = {};
cookieController.setCookie = setCookie;

// CREATES A COOKIE CONTAINING THE USER'S ID - CALLED DURING SIGN UP AND LOGIN
function setCookie(req, res, next) {
  res.cookie('futureMeals', req.body.id, { maxAge: 600000, httpOnly: true })
      res.status(200);
      res.end();
}

module.exports = cookieController;
