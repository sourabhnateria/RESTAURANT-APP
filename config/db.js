const mongoose = require('mongoose')

// function mongodb database connection

const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log (" db error",error,)
        
    }
};
module.exports= connectDb;
