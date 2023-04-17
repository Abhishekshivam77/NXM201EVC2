const{Router} = require("express");
const {User} = require("../model/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const userRouter = Router()


// register routesss beloww  

userRouter.post("/register" , async(req,res)=>{
const{email,password,role} = req.body;
try {
    const userPresent = await User.findOne({emai})
    if(userPresent){
        return res.status(200).send({msg:"USER IS ALREADY REGISTERED, PLEASE LOGIN ♥"})

    }

    const hashedPass = await bcrypt.hashSync(password,5);
    const New_user  = new User({email,password:hashedPass,role})
    await New_user.save()
    res.status(200).send("♥♥♥  User Registered Successfully  ♥♥♥");
} catch (err) {
    res.status(500).send({msg:err.message})
}
})


//logIIINNN belowwww

userRouter.post("/login" , async(req,res)=>{
    const{email,password} = req.body;
    
    try {
        if(!email){
            return res.status(400).send({msg:"PLEASE LOGIN WITH CORRECT DETAILS ♥"})
        }
        const userPresent = await User.findOne({emai})
        if(!userPresent){
            return res.status(400).send({msg:"USER NOT REGISTERED, PLEASE REGISTER ☺ "})
        }
    
        const hashedPass = await bcrypt.hashSync(password,5);
        const New_user  = new User({email,password:hashedPass,role})
        await New_user.save()
        res.status(200).send("♥♥♥  User Registered Successfully  ♥♥♥");
    } catch (err) {
       
    }
    })

    module.exports = {userRouter};
