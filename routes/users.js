var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
 res.end("/users requested");
});


router.get('/user', (req, res, next)=>{
	response = {
		username : req.query.username,
		posts : [
			{
				title: 'Post 1',
				date: '1/1/19',
				audience: 'all',
				image: 'Image for Post 1',
				message: 'This is message 1'
			},
			{
				title: 'Post 2',
				date: '1/5/19',
				audience: 'unit1',
				image: 'Image for Post 2',
				message: 'This is message 2'
			}
		]
	};
 console.log("/user requested");
 console.log(response);
 res.render('user',response);
});


module.exports = router;