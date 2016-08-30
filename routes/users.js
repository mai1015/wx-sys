var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.query.user) {
    res.send('respond with a resource');
    return;
  }
  var user = require('../services/user');
  var id = user.getUserId(req.query.user);
  if (id) {
    res.send('Your user id is' + id);
  } else {
    if (user.createUser(req.query.user)) {
      res.send('Register new user.');
    } else {
      res.send('Register user failed, try later');
    }
  }
  return;
});

module.exports = router;
