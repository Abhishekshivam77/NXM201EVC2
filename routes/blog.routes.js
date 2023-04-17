const {Router} =  require("express")
const {User} = require("../model/user.model")
const {Blog} = require("../model/blog.model")
const jwt =  require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { blacklist } = require("../blacklist")
const {authorise}= require("../middleware/authorise.middleware")
require("dotenv").config()


const blogRouter = Router()


//creatingg  blog
blogRouter.post("/blogcreate",authorise(["User"]),async(req,res)=>{
    try{
        const blog = new Blog({title,content, author:req.userId})
        await blog.save()
        console.log(blog)
        res.status(200).send({msg:"blog created successfully"})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})



//Read  blog
blogRouter.get("/blog",authorise(["User"]),async(req,res)=>{
    try{
        const blog = await Blog.find({author})
        if(!blog){
            return res.status(400).send({msg:"blog not available.."})
        } else {
            res.status(200).send(blog)
        }
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})


blogRouter.delete("/delete",authorise(["User","Moderator"]),async(req,res)=>{
    const {id}= req.params.id;
    try{
        const blog = await Blog.findById(id)
        if(!blog){
            return res.status(400).send({msg:"blog not available.."})
        } else {
            await blog.remove()
            res.status(400).send({msg:"blog deleted successfully.."})
        }
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

blogRouter.patch("/update/:id",authorise(["User"]),async(req,res)=>{
    const {title,content} = req.body;
    const {id}= req.params.id;
    try{
        const blog = await Blog.findById(id)
        if(!blog){
            return res.status(400).send({msg:"blog not available.."})
        }

        if(blog.author !== req.author){
            return res.status(400).send({msg:"blog not available.."})
        } else {
            blog.title = title;
            blog.content = content;
            await Blog.save()
            res.status(200).send("blog updated successfully..")
        }
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

module.exports ={blogRouter}