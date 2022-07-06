const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        min:3,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String,
        default:""
    },
    desc:{
        type:String
    },
    coverPicture:{
        type:String,
        default:""
    },
    city:{
        type:String
    },
    from:{
        type:String
    },
    relationship:{
        type:String,
    }
},{
    timestamps:true
})


const User=mongoose.model("User",userSchema);

module.exports= User;