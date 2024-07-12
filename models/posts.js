const mongoose=require("mongoose");
const postschema= new mongoose.Schema({
    username:String,
    content:String,
});

const Post=  mongoose.model("Post",postschema);

module.exports=Post;