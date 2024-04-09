const mongoose = require('mongoose')


const getConnection =  async (DB_URL)=>{

    try{
        
        //dbName -> it must be same............
        const options = {dbName:"innobyte"}
        await mongoose.connect(DB_URL,options)
    
    }
    catch(err){console.log(err)}

}


module.exports = getConnection;