const express = require("express");
const bodyParser = require("body-parser")
const {connection} = require("./config/db");
require("dotenv").config();
const{Users} = require("./model/user.model")
const {userRouter} = require("./routes/user.routes")
const app = express()
const {Blog} = require("./model/blog.model")
const {blogRouter} = require("./routes/blog.routes")
app.use = express.json()

app.use("/user", userRouter)


//for blog routes=>>>>>>>>>>>>
app.use("/blog", blogRouter)


app.listen(process.env.port, async(req,res)=>{
    try {
        await connection
        console.log("CONNECTED TO MONGO DB ATLAS ♥")
    } catch (err) {
  console.log("Connection Failed") 
  console.log(err.message)       
    }

    console.log(`server is running at port ${process.env.port}`)
})