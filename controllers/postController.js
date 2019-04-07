const Post = require('../models/postModel');

class PostService {

	static list(){
	    return Post.find({})
	      .then((posts)=>{
	        // all posts
	        return posts;
	      });
	  }
	

	static read(id){
	    return Post.findById(id)
	      .then((post)=>{
	        return post;
	      });
  	}	

  	static update(id, data){
      return Post.findById(id)
       .then((post)=>{
         post.set(data);
         post.save();
         return post;
       });
  	}
		
}

module.exports.PostService = PostService;