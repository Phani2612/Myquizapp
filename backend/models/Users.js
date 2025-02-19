const Mongoose = require('mongoose')


const User_Schema = new Mongoose.Schema({


    UT_Email : {
         
          type : String
    },

    UT_Mobile : {

        type : String 
    },

    UT_Password : {

        type : String
    },

    UT_Name : {

        type : String
    }

    
})



const User_Table = Mongoose.model('User_Model' , User_Schema)


module.exports = User_Table


