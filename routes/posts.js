var express = require('express');
var router = express.Router();
const flash = require('express-flash');
const Post = require('../models/postModel');

router.use(flash());

router.get('/', (req, res, next)=>{
	Post.find({}).sort({date:-1})
		.then((posts)=>{
			var response = {
				username : req.query.username,
			 	posts : posts
			    
			}
			console.log(response);
			res.render('posts', response);
		})
		.catch((err)=>{
		  if (err) {
		    res.end("ERROR!");
		  }
		});

 	console.log("/posts requested");
});


router.get('/post', (req, res, next)=>{
 console.log("/post requested");
 console.log(response);
 res.render('/post requested');
});


// Make 2 new entries in DB
router.get('/create', (req, res, next)=>{
	postData = {
		username : req.query.username,	
		title: 'Post 1',
		date: '1/1/19',
		audience: 'all',
		image: 'Image for Post 1',
		message: 'This is message 1'	
	}
	var post = new Post(postData);
	post.save()
		.then(()=>{
			res.redirect('/posts');
		})
		.catch((err)=>{
		    if (err){
		      console.log(err);
		      throw new Error("PhotoSaveError", photo);
		    }
		});
	postData = {
		username : req.query.username,	
		title: 'Post 2',
		date: '1/5/19',
		audience: 'unit1',
		image: 'Image for Post 2',
		message: 'This is message 2'	
	}
	post = new Post(postData);
	post.save()
		.then(()=>{
			res.redirect('/posts');
		})
		.catch((err)=>{
		    if (err){
		      console.log(err);
		      throw new Error("PhotoSaveError", photo);
		    }
		});
});

// New post requested
router.get('/newpost', (req, res, next)=>{
 console.log("/newpost requested");
 res.render('newpost');
});

// New post form posted here
router.post('/newpost', (req, res, next)=>{
	const postData ={
		username: req.query.username,
		title: req.body.title,
		date: req.body.date,
		audience: req.body.audience,
		image: req.body.image,
		message: req.body.message
	};
	var post = new Post(postData);
	post.save()
		.then(()=>{
			res.redirect('/posts');
		})
		.catch((err)=>{
		    if (err){
		      console.log(err);
		      throw new Error("PostSaveError", post);
		    }
		});
});

router.get('/delete/:postID', (req, res, next)=>{
	Post.findOneAndDelete({'_id': req.params.postID})
		.then(()=>{
			res.redirect('/posts')
		})
		.catch((err)=>{
		    if (err){
		      console.log(err);
		      throw new Error("PostDeleteError", req.params.postID);
		    }
		});
});

router.use(function(err, req, res, next){
  console.error(err.stack);
  if (err.message == "PostDeleteError"){
      req.flash('Post could not be deleted');
      res.redirect('/posts');
  } else if (err.message == "PostSaveError"){
    req.flash('photoSaveError', "There was a problem creating your post.");
    res.redirect('/posts');
  } else{
     next(err);
  }
});

module.exports = router;