var express = require('express');
var router = express.Router();
const ejs = require('ejs');
const path = require('path');
const db = require('../routes/dbConnection').db;
const hashing = require('../routes/custom_hashing');

// middleware for checking login
const sessionChecker = (req, res, next)=>{
  if(!req.session.user || !req.signedCookies.secid){
    res.redirect('/');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { display: false });
});

router.post('/', function(req, res){
  console.log('req post from:', req.url, req.body);
  let query = "SELECT `name`, `category`, `cost` FROM `products` WHERE ";
  if(req.body.type == "approx"){
    query += "`name` LIKE '%" + req.body.data + "%'";
    db(query, function(products){
      ejs.renderFile(path.resolve(__dirname + "/Table_Template.ejs"), { products: products }, (err, data) => {
        if (err) {
          console.log(err);
          res.send({ success: false });
        } else {
          res.send({ table: data, success: true });
        }
      });
    });
  } else if(req.body.type == "exact"){
    query += "`category`='" + req.body.data + "'";
    db(query, function(products){
      ejs.renderFile(path.resolve(__dirname + "/Table_Template.ejs"), { products: products }, (err, data) => {
        if (err) {
          console.log(err);
          res.send({ success: false });
        } else {
          res.send({ table: data, success: true });
        }
      });
    });
  } else if(req.body.type == "range"){
    query += "`cost`<='" + req.body.data[1] + "' AND `cost`>='" + req.body.data[0] + "'";
    db(query, function(products){
      ejs.renderFile(path.resolve(__dirname + "/Table_Template.ejs"), { products: products }, (err, data) => {
        if (err) {
          console.log(err);
          res.send({ success: false });
        } else {
          res.send({ table: data, success: true });
        }
      });
    });
  } else {
    res.send({ success: false });
  }
});

module.exports = router;
