var express = require('express');
var router  = express.Router();
//var db      = require('../models/connection');
var path    = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
  res.render('index', { title: `Express ${req.session.cuenta}` });
});

module.exports = router;
