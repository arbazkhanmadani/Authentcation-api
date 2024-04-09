const nodemailer = require('nodemailer')

const transport = async ()=>{

}

const mailer = nodemailer.createTransport({

    host:"smtp.gmail.com",
    port :process.env.EMAIL_PORT,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    },
    secure:false
})


module.exports =  mailer;


