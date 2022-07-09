const router = require("express").Router();
const Conversation = require("../models/conversation.js");

// creating the conversation
router.post("/",async (req,res)=>{
    let newConversation=   new Conversation({
        members: [req.body.senderId,req.body.recieverId]
    });
    
    try{
        const savedConversation=await newConversation.save();
        res.status(200).json({success:true,conversation:savedConversation});
    }catch(error)
    {
        res.json({success:false,message:error});
    }
})


// get conversations of user
router.get("/:id",async (req,res)=>{
    try{

        const conversations=await Conversation.find({
            members:{$in:[req.params.id]}
        })
        res.status(200).json({success:true,conversations:conversations});


    }catch(error)
    {
        res.json({success:false,message:error});
    }
})

module.exports=router