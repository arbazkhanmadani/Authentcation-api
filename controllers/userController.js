const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const mailer = require('../config/emailConfig')
const fs = require('fs')
const path = require('path')
const handlebar = require('handlebars')

class UserController{

static salt = crypto.randomBytes(16).toString('hex')
    
//register=====================================================
static signup = async (req, res)=>{

    const{username,email,password,password_confirm} = req.body

    const user = await userModel.findOne({email:email})

        if(user){
            res.send({"status":"failed","message":"email already exists go to login"})
        }else{

            if(username && email && password && password_confirm){
                
                if(password===password_confirm){

                    try{
                        //generating salt..................................
                        console.log("user salt "+this.salt)
                        //Making password hash.............................
                        const hashPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');
                        const doc = userModel({
                            username : username,
                            password:hashPassword,
                            email:email
                            
                        })
                        const savedUser= await doc.save()
                        
                        if(savedUser!=null){

                            const emailTempFile =  path.join(path.resolve(__dirname),"..")
                            const emailTemp = fs.readFileSync(emailTempFile+'\\emailTemp.html','utf-8').toString()

                            const soruce = handlebar.compile(emailTemp)
                            const replacement = {
                                DATE:new Date(),
                                LINK:`${process.env.WESITE_NAME}api/login`
                            }
                            const template = soruce(replacement)
                            const senderDetail ={
                                from : process.env.USER_MAIL,
                                to : email,
                                subject : `${process.env.WESITE_NAME} said, thanks for registration.`,
                                html:template
                            }
                            mailer.sendMail(senderDetail)
                            
                            res.send({"status":"successful","message":"successfully registered"})
                        }
                        else{
                            res.send({"status":"failed","message":"somthing went wrong..."})
                        }
                    }catch(err){
                        console.log(err)
                        res.send({"status":"failed","message":"Unable to register"})
                    } 
                }else{
                    res.send({"status":"failed","message":"password and confirm password does'nt match"})
                }
            }else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }

    
}




//Login=====================================================
static login = async(req, res)=>{


    try{
        const{email,password} = req.body

        if(email && password){

            const user = await userModel.findOne({email:email})
            if(user!=null){
                
               const isMatchHashPass = crypto.pbkdf2Sync(password,this.salt, 1000, 64, `sha512`).toString('hex');
                if(user.email === email && user.password==isMatchHashPass){
                    
                    const savedUser = await userModel.findOne({email:email}).select('-__v').select('-password')

                     const token = jwt.sign({userID:savedUser._id}, process.env.JWT_TOKEN, {expiresIn:'5d'})
                    
                     res.cookie('token', token)
                    res.send({"status":"success","message":"Login successfully"})
      
                }else{
                    res.send({"status":"failed","message":"email or password is wrong"})
                }

            }else{
                res.send({"status":"failed","message":"user not found"})
            }

        }else{
            res.send({"status":"fialed","message":"all fields are required"})
        }

    }catch(err){
        console.log(err)
    }
}





static profile = async (req, res)=>{


    if(req.user){

        res.status(200).json({"user":req.user});
    }
    else{
        res.status(404).json({"status":"failed","message":"sorry you're not a valid user plss be register first."});
        
    }
}















}

module.exports = UserController


