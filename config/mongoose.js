const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL)
const db=mongoose.connection;
db.on("error",console.error.bind("Connection error"));
db.once('open',function(){
    console.log("Connection is made with DB very successfully");
});
