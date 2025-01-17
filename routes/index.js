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
  var sql = 'SELECT p.id, p.title, p.thumbnail, p.price FROM order_details d INNER JOIN products p ON d.product_id = p.id WHERE p.active = 1 GROUP BY d.product_id ORDER BY COUNT(*) DESC LIMIT 3';
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
  sql = 'SELECT * FROM products where active = 1';
  var inCart = (req.session.cart) ? Object.keys(req.session.cart).length : 0;
  db.query(sql, (err, results) => {
    if (!err) {
      res.render('front/products', {title : 'NodeCommerce', products: results, inCart: inCart});
    }else{
      console.log(err);
      res.redirect('/');
    }
  })
})

router.get('/cart', (req, res, next) => {
  var inCart = (req.session.cart) ? Object.keys(req.session.cart).length : 0;
  var active = (req.session.user) ? 1 : 0;
  var total = 0;
  req.session.cart.forEach((product) => {
    total += product.price;
  })
  res.render('front/cart', {title: 'NodeCommerce', inCart: inCart, products: req.session.cart, total: total, active: active});
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

router.put('/cart', upload.single('avatar'), (req, res, next) => {
  var cart = req.session.cart;
  cart = cart.filter(product => product.id != req.body.key);
  req.session.cart = cart;
  res.json(true);
})

router.post('/payment', upload.single('avatar'), (req, res, next) => {
  var orderID = req.body.orderID;
  var sql = 'insert into orders set ?';
  var order = {
    date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    users_id: req.session.user.id,
    transaction_id: orderID
  }
  db.query(sql, order, (err, results) => {
    if (!err) {
      key = results.insertId;
      sql = 'INSERT INTO order_details set ?';
      
      req.session.cart.forEach((product) => {
        detail = {
          orders_id: key,
          product_id: product.id
        }
  
        db.query(sql, detail, (err, results) => {
          if (!err){
            console.log(true);
          }else{
            console.log(err)
          }
        })
      })
      req.session.cart = [];
      res.json(true);
    }else{
      res.send(err)
    }
  })
})

router.get('/mis-cursos', (req, res, next) => {
  if (req.session.user){
    sql = 'SELECT DISTINCT p.* FROM order_details AS od INNER JOIN products p ON p.id = od.`product_id` INNER JOIN orders o ON o.id = od.orders_id WHERE o.users_id = ?'
    var inCart = (req.session.cart) ? Object.keys(req.session.cart).length : 0;
    db.query(sql, [req.session.user.id], (err, results) => {
      if (!err){
        res.render('front/descargas', {products: results, title: 'NodeCommerce', inCart: inCart})
      }else{
        res.send(err)
      }
    })
  }else{
    res.redirect('/')
  }
})

router.get('/contact' , (req, res, next) => {
  var inCart = (req.session.cart) ? Object.keys(req.session.cart).length : 0;
  res.render('front/contact', {title: 'NodeCommerce', inCart: inCart})
})

module.exports = router;
