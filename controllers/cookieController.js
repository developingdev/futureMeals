const cookieController = {};
cookieController.setCookie = setCookie;

function setCookie(req, res, next) {
  console.log('COOKIE BODY', req.body);
  res.cookie('id', req.body._id, { httpOnly: true });
  next();
}

module.exports = cookieController;
