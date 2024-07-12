const express = require("express");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require('method-override');
const mongoose=require("mongoose");
const Post=require("./models/posts.js");
const app=express();
const port=8080;
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main()
.then(console.log("connection successful"))
.catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Post');
}
/*let posts=[{
    id:uuidv4(),
    username:"apnacollege",
    content:"I love coding!"
},{
    id:uuidv4(),
    username:"suman",
    content:"i am learning web developement",
}]*/




/*const post1=new Post({
    username:"apnacollege",
    content:"I love coding!"
});
post1.save()
.then(console.log("post1 successfully saved in db"))
.catch(err=>{console.log(err)});*/


app.listen(port,()=>{
    console.log(`sever is listening on port ${port}`);
})

app.get('/post', async (req,res)=>{
    let posts= await Post.find({});
    //console.log(posts);
    res.render("index.ejs",{posts});
})

app.get('/post/new',(req,res)=>{
    res.render("new.ejs");
})

app.post('/post',(req,res)=>{
    let {username:newuser,content:newcontent}=req.body;
    console.log(req.body);
    const newpost=new Post({
        username:newuser,
        content:newcontent,
    });
    //console.log(newpost);
    newpost.save()
    .then(console.log("new post saved successfully"))
    .catch(err=>{console.log(err)});
    res.redirect("http://localhost:8080/post");
})

app.get('/post/:id',async (req,res)=>{
    let {id}=req.params;
    const post= await Post.findById(id);
    res.render("post.ejs",{post});
    //res.send("post in detail");
    console.log(post);
})

app.get('/post/:id/edit',async (req,res)=>{
    let {id} =req.params;
    const post= await Post.findById(id);
    //let post=posts.find((ele)=>{ return ele.id===id})
    if(post){
        res.render("edit.ejs",{post});
    }
    else{
        res.send("post not found");
    }
   
})

app.patch('/post/:id',async (req,res)=>{
    let {id}=req.params;
    let {content:newcontent}=req.body;
    //let post=posts.find((ele)=>{ return ele.id===id});
    const post=await Post.findByIdAndUpdate(id,{content:newcontent},{runValidators:true,new:true});
    //console.log(post);
    res.redirect("http://localhost:8080/post");
})

app.delete('/post/:id',async (req,res)=>{
    let {id}=req.params;
    let post= await Post.findByIdAndDelete(id);
   // console.log(post);
    //let post=posts.find((ele)=>{ return ele.id===id});
    res.redirect("http://localhost:8080/post");
})