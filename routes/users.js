var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
 res.end("/users requested");
});


router.get('/user', (req, res, next)=>{
	
 console.log("/user requested");
 
 res.render('/user');
});


module.exports = router;