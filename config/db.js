const mongoose = require('mongoose')

const connectDB = async() =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Mongoose Connected: ${conn.connection.host}`.blue.underline.bold)

  }catch(error){
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
    
  }
}
module.exports = connectDB;

