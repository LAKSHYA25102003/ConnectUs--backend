const jwt=require("jsonwebtoken");


const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');

    if(!token)
    {
        res.status(401).json({success:false,message:"invalid token"});
        return ;
    }

    const data=jwt.verify(token,process.env.TOKEN_SECRET);
    req.user=data;

    next();

}

module.exports=fetchuser;