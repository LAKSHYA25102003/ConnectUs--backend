const express=require("express");
const app=express();
const helmet=require("helmet");
const morgan=require("morgan");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
dotenv.config();

const db=require("./config/mongoose");

// middle ware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("tiny"));



// api call
app.use("/api/user",require("./routes/users"));
app.use("/api/user/auth",require("./routes/auth"));
app.use("/api/user/post",require("./routes/posts"));

app.listen(8000,(err)=>{
    if(err)
    {
        console.log(`Error:${err}`)
    }
    else
    {
        console.log("Backend server is running!");
    }
})