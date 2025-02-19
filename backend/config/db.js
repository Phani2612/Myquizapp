const Mongoose = require('mongoose')


const ConnectDB = async()=>{

      try{

        const DB = await Mongoose.connect(`${process.env.MONGODB_URL}`)

      console.log(`mongodb connected to host : ${DB.connection.host}`)

      }

      catch(error){

        console.error(error)
        process.exit(1)

      }
}



module.exports = ConnectDB