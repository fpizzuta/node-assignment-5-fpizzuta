const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');

const PostService = postController.PostService;

router.use((req, res, next)=>{
  res.set({
  // allow any domain, allow REST methods we've implemented
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
  // Set content-type for all api requests
    'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

router.get('/', (req, res, next)=>{
   PostService.list()
    .then((posts) => {
      console.log(`API: All posts: ${posts}`);
      res.status(200);
      res.send(JSON.stringify(posts));
    });
  
});

router.get('/:postid', (req, res, next)=>{
  console.log(`finding ${req.params.postid}`);
  PostService.read(req.params.postid)
    .then((post) => {
     console.log(`Found post: ${post}`);
     res.status(200);
     res.send(JSON.stringify(post));
   }).catch((err)=>{
     res.status(404);
     res.end();
   });
});

router.put('/:postid', (req, res, next)=>{
  console.log(`putting ${req.params.postid}`);
  let putdata = req.body;
  PostService.update(req.params.postid, putdata)
    .then((updatedPost)=>{
      res.status(200);
      res.send(JSON.stringify(updatedPost));
    }).catch((err)=> {
      res.status(404);
      res.end();
    });
 });

 router.post('/', async (req, res, next)=>{
   const post  = {
        username: req.query.username,
		title: req.body.title,
		date: req.body.date,
		audience: req.body.audience,
		image: req.body.image,
		message: req.body.message
       }

  try{
     const postSave = await PostService.create(post);
     res.status(201);
     res.send(JSON.stringify(postSave));
   }catch(err){
     console.log(err);
     throw new Error("PostSaveError", post);
   }
 });

 router.delete('/:postid', (req, res, next)=>{
  let id = req.params.postid;
  PostService.delete(req.params.postid)
    .then((post) => {
     console.log(`Deleted post: ${id}`);
     res.status(200);
     res.send(JSON.stringify(post));
   }).catch((err)=> {
     res.status(404);
     res.end();
   });;
});

 router.use(function(err, req, res, next){
  console.error(err);
  res.status(500);
  res.end();
});

module.exports = router;