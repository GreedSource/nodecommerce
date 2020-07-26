var express = require('express');
var router  = express.Router();
var db      = require('../models/connection');
var path    = require('path');
var multer  = require('multer');
var upload  = multer({ dest: 'uploads/' });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('security/index', { title: `Login` });
});

router.post('/', upload.single('avatar'), (req, res, next) => {
  email = req.body.email;
  password = req.body.password;
  sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  db.query(sql, (err, results) => {
    if (!err){
      if (results.length !== 0){
        req.session.user = results[0];
        res.json(true);
      }else{
        res.json(false);
      }
    }else{
      res.send(err);
    }
  })
});

router.get('/registro', (req, res, next) =>{
  res.render('security/register', { title: 'Registro'});
});

router.post('/registro', upload.single('avatar'), (req, res, next) => {
  //res.send(req.body);
  var sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
  db.query(sql, (err, results) => {
    if (!err){
      if (Object.keys(results).length === 0){
        var user = {
          name: req.body.name,
          lastname: req.body.lastname,
          password: req.body.password,
          email: req.body.email
        };
        sql = 'INSERT users SET ?';
        db.query(sql, user, (err, results) => {
          if (!err){
            res.json(results.insertId);
          }else{
            res.send(err);
          }
        });
      }else{
        res.send(false);
      }
    }else{
      console.log(err)
    }
  })
});

router.get('/logout', (req, res, next) => {
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;