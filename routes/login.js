var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
 console.log('/login requested');
 res.render('login');
});

module.exports = router;