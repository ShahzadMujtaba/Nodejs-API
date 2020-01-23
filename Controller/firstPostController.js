const Post = require("../Model/PostTrial")

const getfirstpost = (req,res)=>{
   // res.send("Hello Nodejs express changes")
    const posts = Post.find().select("_id title body")
    .then((posts)=>{
        res.status(200).json({posts:posts})
    })
    .catch(err=>console.log(err))
}

const createPost = (req,res)=>{
   const post = new Post(req.body)

   post.save((err,result)=>{
       if(err){
           return res.status(400).json({
               error:err
           })
       }
       res.status(200).json({
           post:result
       })
   })
   console.log("CREATING POST: ",req.body);
}
module.exports = {
    getfirstpost,createPost
};
