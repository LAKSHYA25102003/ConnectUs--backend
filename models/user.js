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
        type:Number,
        enum:[1,2,3]
    }
},{
    timestamps:true
})


const User=mongoose.model("User",userSchema);

module.exports= User;