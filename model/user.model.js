const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password : {type:String, required: true, unique:true},
    role : {type:String, enum: ["User","Moderator"], default:"User",required:true}
})

const User = mongoose.model("user",userSchema);

module.exports = {User};