const mongoose=require("mongoose");

const conversationSchema=new mongoose.Schema({
    members:{
        type:Array
    }
},{timestamps:true})


const Conversationst=mongoose.model("Conversation",conversationSchema);

module.exports= Conversation;