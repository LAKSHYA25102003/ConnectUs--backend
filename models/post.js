const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    desc:{
        type:String
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[],
    }
},{timestamps:true})


const Post=mongoose.model("Post",postSchema);

module.exports= Post;