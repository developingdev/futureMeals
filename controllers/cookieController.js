const cookieController = {};
cookieController.setCookie = setCookie;

function setCookie(req, res, next) {
  console.log('COOKIE BODY', req.body);
  res.cookie('futureMeals', req.body.id, { httpOnly: true })
      res.status(200);
      res.end();
}

module.exports = cookieController;
