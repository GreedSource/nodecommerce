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
    db.query('SELECT * FROM products', (err, results) => {
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
          res.json(1);
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
/* 
router.post('/edit/:id', (req, res, next) => {
  upload(req, res, (err) => {
    if(err){
      res.redirect('/edit/' + req.params.id)
    }else{
      if (req.file === undefined){
        var change = {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          sexo: req.body.sexo,
          imagen : req.body.src
        }
        var sql = 'UPDATE test SET ? WHERE id='+ req.params.id;
         db.query(sql, change, (err, results)=>{
           if (err) throw err;
           res.send('<a href="/">Registro actualizado, regresar a inicio</a>');
         });
       }else{
         console.log('hello world');
         res.render('edit', {
           msg: 'File uploaded!',
           //file: `uploads/${req.file.filename}`,
           title: 'Edit'
         });
         //var foto = req.file.originalname;
         var foto = res.req.file.filename;
         var valor = {
           nombre : req.body.nombre,
           apellido : req.body.apellido,
           imagen : foto,
           sexo : req.body.sexo,
         }
         var sql = 'UPDATE products SET ? WHERE id='+ req.params.id;
         db.query(sql, valor, (err, results)=>{
           if (err) throw err;
           res.send('<a href="/">Registro actualizado, regresar a inicio</a>');
         });
      }
    }
  });
});
 */
router.delete('/delete/:id', (req, res, next) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (!err){
      res.send(true);
    }
    console.log(results);
  });
});

router.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if(err){
      res.redirect('/crud')
    }else{
      if (req.file === undefined){
        res.render('crud', {
          msg: 'Error: no file selected!!',
          title: 'Post'
        });
        //console.log(err);
        console.log(req.body);
      }else{
        //console.log('hello world');
        res.render('crud', {
          msg: 'File uploaded!',
          //file: `uploads/${req.file.filename}`,
          title: 'Post'
        });
        //var foto = req.file.originalname;
        var foto = res.req.file.filename;
        console.log(foto);
        var valor = {
          nombre : req.body.nombre,
          apellido : req.body.apellido,
          imagen : foto,
          sexo : req.body.sexo,
        }
        var sql = 'INSERT INTO products SET ?';
        db.query(sql, valor, (err, results)=>{
          if (err) throw err;
        }); 
      }
    }
  });
})

module.exports = router;