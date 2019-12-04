var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/submit', function(req,res, next){
  res.send('This works');
  console.log(req.body.email);
});

module.exports = router;
