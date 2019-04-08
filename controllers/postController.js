const Post = require('../models/postModel');

class PostService {

	static list(){
	    return Post.find({}).sort({date:-1})
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

  	static create(obj){
	    const post = new Post(obj);
	    return post.save();
  	}

  	static delete(id){
    return Post.deleteOne({_id: id})
      .then((obj)=>{
        //removed
        return obj;
      })
  }
		
}

module.exports.PostService = PostService;