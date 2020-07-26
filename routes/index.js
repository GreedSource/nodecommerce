var express = require('express');
var router  = express.Router();
var db      = require('../models/connection');
var path    = require('path');
var multer  = require('multer');
var upload  = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.cart = (req.session.cart) ? req.session.cart : [];
  var inCart = (req.session.cart) ? Object.keys(req.session.cart).length : 0;
  var sql = 'SELECT p.id, p.title, p.thumbnail, p.price FROM order_details d INNER JOIN products p ON d.product_id = p.id GROUP BY d.product_id ORDER BY COUNT(*) DESC LIMIT 3';
  db.query(sql, (err, results) => {
    results = (Object.keys(results).length === 0) ? [] : results;
    res.render('index', { title: `NodeCommerce`, products: results, inCart: inCart });
  });
});

router.get('/details/:id', (req, res, next) => {
  var key = req.params.id;
  var inCart = (req.session.cart) ? Object.keys(req.session.cart).length : 0;
  console.log(req.session.cart)
  db.query('SELECT * FROM products WHERE id = ?', [key], (err, results) => {
    if(!err) {
      if (Object.keys(results).length !== 0) {
        product = results[0];
        sql = 'SELECT * FROM comments WHERE products_id = ? order by id asc';
        db.query(sql, [key], (err, rows) => {
          if(!err){
            var comments = (Object.keys(rows).length !== 0) ? rows : [];
          }else{
            var comments = [];
          }
          res.render('front/details', { title: 'NodeCommerce', product: product, comments: comments, inCart: inCart});
        });
      }else{
        res.redirect('/');
      }
    }else{
      res.redirect('/');
    }
  })
});

router.post('/comments', upload.single('avatar'), (req, res, next) => {
  var data = {
    fullname: req.body.name,
    content: req.body.message,
    products_id: req.body._id
  }
  var sql = 'INSERT INTO comments SET ?';
  db.query(sql, data, (err, results) => {
    if (!err) {
      res.json(results.insertId);
    }else{
      res.json(err);
    }
  })
})

router.get('/courses', (req, res, next) => {
  sql = 'SELECT * FROM products';
  var inCart = (req.session.cart) ? Object.keys(req.session.cart).length : 0;
  db.query(sql, (err, results) => {
    if (!err) {
      res.render('front/products', {title : 'NodeCommerce', products: results, inCart: inCart});
    }else{
      res.redirect('/');
    }
  })
})

router.post('/cart', upload.single('avatar'), (req, res, next) => {
  var sql = 'SELECT * FROM products WHERE id = ?';
  var key = req.body.key;
  //req.session.cart = [];
  db.query(sql, [key], (err, results) => {
    if (!err){
      if (Object.keys(results) !== 0){
        var cart = req.session.cart;
        founded = false;
        cart.forEach(product => {
          if (product.id === results[0].id){
            founded = true;
          }
        });
        
        if (founded == false){
          cart.push(results[0]);
          req.session.cart = cart;
          res.json(true);
        }else{
          res.json(false);
        }
        //console.log(req.session.cart)
      }else{
        res.json(false);
      }
    }else{
      res.send(err);
    }
  })
})

module.exports = router;
