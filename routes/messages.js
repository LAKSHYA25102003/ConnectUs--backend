const router = require("express").Router();
const Message = require("../models/message.js");


// add a message
router.post("/",async (req,res)=>{
    try{
        const newMessage=new Message(req.body);
        const savedMessage=await newMessage.save();
        res.status(200).json({success:true,message:savedMessage});

    }catch(error)
    {
        res.json({success:false,message:error});
    }
})


// get a message
router.get("/:id",async (req,res)=>{
    try{

        const messages=await Message.find({
            conversationId:req.params.id
        })
        res.status(200).json({success:true,messages:messages});

    }catch(error)
    {
        res.json({success:false,message:error});
    }
})

module.exports=router