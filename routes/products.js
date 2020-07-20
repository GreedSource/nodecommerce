var express = require('express');
var router  = express.Router();
var multer      = require('multer');
var db          = require('../models/connection');
var path        = require('path');
var crypto      = require('crypto');

const storage = multer.diskStorage({
  destination: './public/storage/',
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    });
  }
});

const upload = multer({
  storage : storage,
}).fields([
  {
    name: 'thumbnail',
    maxCount: 1
  },
  {
    name: 'filename',
    maxCount: 1
  }
]);

/* GET home page. */
router.get('/', function(req, res, next) {
    db.query('SELECT * FROM products WHERE active = 1', (err, results) => {
        res.render('products/index', { title : 'Productos', products:results });
    });
});

router.get('/add', (req, res, next) => {
  res.render('products/crud', { title : 'Productos' });
});

router.post('/add', (req, res, next) => {
  upload(req, res, (err) => {
    if (!err){
      var foto = res.req.files['thumbnail'][0].filename;
      var filename = res.req.files['filename'][0].filename;
      var data = {
        title:        req.body.title,
        description:  req.body.description,
        price:        req.body.price,
        stock:        req.body.stock,
        thumbnail:    foto,
        filename:     filename,
        author:       req.body.author,
        technology:   req.body.technology
      };
      var sql = 'INSERT INTO products SET ?';
      db.query(sql, data, (err, results)=>{
        if (!err){
          res.json(results.insertId);
        }
      }); 
    }else{
      res.send(err);
    }
  });
});

router.post('/edit', (req, res, next) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.body.key], (err, results) => {
    if(!err){
      console.log();
      if (Object.keys(results).length !== 0){
        res.render('products/edit', {title : 'Productos', product:results[0], msg : null});
      }else{
        res.redirect('/');
      }
    }else{
      console.log(err);
    }
  });
});
 
router.put('/edit', (req, res, next) => {
  upload(req, res, (err) => {
    if(!err){
      var foto = req.files['thumbnail'] ? res.req.files['thumbnail'][0].filename : req.body._thumbnail;
      console.log(foto);
      var filename = req.files['filename'] ? res.req.files['filename'][0].filename : req.body._filename;
      var data = {
        title:        req.body.title,
        description:  req.body.description,
        price:        req.body.price,
        stock:        req.body.stock,
        thumbnail:    foto,
        filename:     filename,
        author:       req.body.author,
        technology:   req.body.technology
      };
      var sql = 'UPDATE products SET ? WHERE id= '+ req.body.key;
      db.query(sql, data, (err, results)=>{
        if (!err){
          res.json(1);
        }
      });
    }
  });
});

router.put('/delete', (req, res, next) => {
  upload(req, res, (err)=> {
    if (!err){
      var sql = 'UPDATE products SET active = 0 WHERE id = ' + req.body.key;
      db.query(sql, (err, results)=>{
        if (!err){
          res.send(true);
        }else{
          res.send(err);
        }
      });
    }
  })
});

module.exports = router;