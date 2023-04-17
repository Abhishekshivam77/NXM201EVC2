const authorise = (role)=>{
    return (req,res,next) =>{
        const user_role = req.role;
        if(role.includes(user_role)){
            next()
        } else {
            return res.send("Unauthorised")
        }
    }
}

module.exports =  {authorise}