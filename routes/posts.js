const router = require("express").Router();
const Post = require("../models/post");
const fetchuser = require("../middleware/fetchuser");
const User=require("../models/user");

// create a post
router.post("/", fetchuser, async (req, res) => {
    const newPost = await new Post(req.body);
    try {
        let savedPost = await newPost.save();
        await savedPost.updateOne({$set:{userId:req.user.id}});
        savedPost=await Post.findById(newPost.id);
        res.status(200).json({ success: true, message: "post is created successfully", post: savedPost });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
})


// update a post
router.put("/update/:id", fetchuser, async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (post.userId === req.user.id) {
            await post.updateOne({$set:req.body});
            res.status(200).json({success:true,message:"post is updated successfully"});
            return ;
        }
        else {
            res.status(403).json({ success: false, message: "you can not update post of other people" });
            return;
        }
    }catch(err)
    {
        res.status(500).json({success:false,error:err,message:"post is not found"})
        return ;
    }
})

// delete a post
router.delete("/delete/:id", fetchuser, async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (post.userId === req.user.id) {
            await post.deleteOne();
            res.status(200).json({success:true,message:"post is deleted successfully"});
            return ;
        }
        else {
            res.status(403).json({ success: false, message: "you can not delete post of other people" });
            return;
        }
    }catch(err)
    {
        res.status(500).json({success:false,error:err,message:"post is not found"})
        return ;
    }
})


// get users post
router.get("/profile/:id",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.id});
        res.status(200).json({success:true,posts:posts});
        return ;
    }
    catch(err)
    {
        res.status(500).json({success:false,error:err});
        return ;
    }
})



// likes a post
router.put("/:id/like",fetchuser,async (req,res)=>{
    const post= await Post.findById(req.params.id);
    try{
        if(!post.likes.includes(req.user.id))
        {
            await post.updateOne({$push:{likes:req.user.id}});
            res.status(200).json({success:true,message:"post is liked successfully"});
            return ;
        }
        else
        {
            await post.updateOne({$pull:{likes:req.user.id}});
            res.status(200).json({success:true,message:"post is disliked successfully"});
            return ;
        }
    }
    catch(err){
        res.status(500).json({success:false,error:err});
    }
})


// get a post
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json({success:true,post:post});
        return ;
    }
    catch(err)
    {
        res.status(500).json({success:false,error:err});
        return ;
    }
})


// get all post
router.get("/timeline/all",fetchuser,async (req,res)=>{
    try{
        const currUser=await User.findById(req.user.id);
        const userPosts=await Post.find({userId:req.user.id});
        const friendsPosts=await Promise.all(
            currUser.following.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        )
        res.status(200).json({success:true,posts:userPosts.concat(...friendsPosts)});
        return ;
    }
    catch(err)
    {
        res.status(500).json({success:false,error:err});
        return ;
    }
})


module.exports = router;