const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
	username: {type: String},
	title: {type: String, required:true},
	date: {type: Date},
	audience: {type: String, required:true},
	image: {type: String},
	message: {type: String, required:true}
});

schema.pre('save', function(next){
  if (!this.createdAt){
    this.createdAt = new Date();
  }else{
    this.updatedAt = new Date();
  }
  next();
});

schema.pre('update', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Post", schema);

