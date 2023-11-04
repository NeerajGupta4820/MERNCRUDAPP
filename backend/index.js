const express=require("express");
const mongoose= require("mongoose");
const app=express();
const router = require("./routes/router");

var cors=require("cors");
app.use('/public',express.static('public'));
app.use(cors());
app.use(express.json());
app.use(router);

// const url="mongodb+srv://admin:4LPZudtJGHHLK2Xx@cluster0.5qu8lrg.mongodb.net/?retryWrites=true&w=majority"
const url2="mongodb+srv://root:8860125708@cluster1.njnnwfu.mongodb.net/crud"

mongoose.connect(url2).then(()=>{
    console.log("Database Connected Succssfully")
}).catch((err)=>{
    console.log(err)
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});