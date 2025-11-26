const mongoose = require('mongoose')

const connectDB = async() =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL,{
      const mongoose = require('mongoose')

const connectDB = async() =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL,{
      maxPoolSize: 20,     //maximum number of connections in the pool
      minPoolSize: 5,      // starting number of connections
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`Mongoose Connected: ${conn.connection.host}`.blue.underline.bold)

  }catch(error){
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
    
  }
}
module.exports = connectDB;


    })
    console.log(`Mongoose Connected: ${conn.connection.host}`.blue.underline.bold)

  }catch(error){
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
    
  }
}
module.exports = connectDB;

