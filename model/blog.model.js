const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {type:String,required:true},
    content : {type:String, required: true,author:{type:String,default:"User",required:true}},
    role : {type:String, enum: ["User","Moderator"], default:"User",required:true}
})

const Blog = mongoose.model("blog",blogSchema);

module.exports = {Blog};