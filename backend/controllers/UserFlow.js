
const User_Model = require('../models/Users')
const BCRYPT = require('bcryptjs')


const SignUp = async (req, res) => {

    const { email, mobile, password } = req.body

  

    try {

        


        const isUserExists = await User_Model.findOne({ UT_Email: email })

        if (!isUserExists) {

            const HashedPassword = await BCRYPT.hash(password, 12)
            console.log("hashedpassword", HashedPassword)

            const NewUser = new User_Model({

                UT_Email: email,
                UT_Mobile: mobile,
                UT_Password: HashedPassword
            })

            await NewUser.save()


            return res.status(201).json({ message: 'user created successfully', redirect_url: '/' })


        }

        else {

            return res.status(409).json({ message: 'User already exists', redirect_url: '/' })
        }


    }

    catch (error) {

        console.error(error)

        return res.status(500).json({ message: "Internal Server error" })
    }

}


const Login = async (req, res) => {

    const {email , password , user_name , user_email} = req.body 

     console.log(req.body)

    try{


        if(user_email){

              let User = await User_Model.findOne({UT_Email : user_email})

              if(!User){
                 
                 const Google_User = new User_Model({

                    UT_Email : user_email,
                    UT_Name : user_name
                      
                 })

                 await Google_User.save()

                 return res.status(201).json({ message: "Google Account Registered & Logged In", redirect_url: "/home" , User_Email : user_email });
                

              }

            
                return res.status(200).json({ message: "Successfully Logged in with Google", redirect_url: "/home" ,  User_Email : user_email});
              
        }









        if(!email || !password){
            return res.status(400).json({message : "All fields are required"})
        }

        const Result = await User_Model.findOne({UT_Email : email})

        if(!Result){
            
            return res.status(404).json({message : 'User not found , please signup' , redirect_url : '/signup'})
        }

        const Comparision = await BCRYPT.compare(password , Result.UT_Password)

        if(!Comparision){

            return res.status(401).json({message : 'please check your credentials' , redirect_url : '/'})

        }

        return res.status(200).json({message : 'Successfully loggedin' , redirect_url : '/home' , User_Email : Result.UT_Email})



    }

    catch(error){
        console.error(error)

        return res.status(500).json({message : "Internal Server error"})
    }

}



module.exports = { SignUp, Login }