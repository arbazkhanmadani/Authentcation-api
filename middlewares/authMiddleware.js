const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')


var checkUserAuthentication = async (req,res,next)=>{

    const cookie = req.headers.cookie
    const cookieArray = cookie.trim().split('=')
    const token = cookieArray[1]
   
    //console.log(cookieArray)
    //const authorization = req.headers.authorization
   
    if(token){

        try{
           
            //Verify Token...............
            const{userID} = jwt.verify(token,process.env.JWT_TOKEN)
            req.user = await userModel.findById({_id:userID}).select('-__v').select('-_id').select('-password')
            //next() -> forwarding middleware.....
            next()
        }catch(err){
            res.status(401).send({"status":"failed","message":"Unauthorized User."})
        }
    }if(!token){
        res.status(401).send({"status":"failed","message":"unauthorized user, No token."})
    }
}



module.exports = checkUserAuthentication