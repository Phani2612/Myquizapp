import { useState } from "react";
import { FcGoogle} from "react-icons/fc";
import axios from "axios";
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import { myAuth, myProvider } from '../Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from "../Auth/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useForm} from 'react-hook-form'


export default function Login() {

  

  



const { enqueueSnackbar } = useSnackbar();

const Navigate = useNavigate()

const {login} = useAuth()

const {register , formState : {errors} , trigger , getValues} = useForm()

const [showpassword , setshowpassword] = useState(false)


 const handleSubmit = async(e)=>{

     e.preventDefault()

     const isValid = await trigger()
     if (!isValid) return; // Stop if validation fails


     const formData = getValues();
  console.log(formData); // Send formData to backend
     

     try{

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login` , formData)

      const {message , redirect_url , User_Email} = response.data

      enqueueSnackbar(message , {variant : 'success'})

      login(User_Email)

      Navigate(redirect_url)



     }

     catch(error){

        console.error(error)

        enqueueSnackbar(error.response.data.message , {variant : 'error'})
     }
 }



 const LoginwithGoogle = () => {

  signInWithPopup(myAuth, myProvider)
      .then(async function (output) {
          const user = myAuth.currentUser;
          const user_name = user.displayName;
          const user_email = user.email;
          const uid = user.uid;
          const profilePic = user.photoURL;

          localStorage.setItem('User_Email', user_email);
          localStorage.setItem('User_Photo', profilePic);


          console.log(output)
          try {
              const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                  user_name,
                  user_email,
                  uid,
                  profilePic
              });

              const { message, redirect_url , User_Email } = response.data

              console.log(response.data)

              enqueueSnackbar(message, { variant: 'success' })

              
              login(User_Email)

              Navigate(redirect_url)

          } catch (error) {
              console.error('Error storing user in database:', error);

              // An error occurred while processing the request

              enqueueSnackbar('An error occurred while processing the request', { variant: 'error' })
          }


      })
      .catch((error) => {
          console.log('Error during Firebase login:', error);
      });

}




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 ">
 
    <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-lg w-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Login</h2>
  
      <form className="mt-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" 
            placeholder="Enter your email" 
            name="email"
            // onChange={(e) => setlogindetails({ ...logindetails, [e.target.name]: e.target.value })}
            {...register('email' , {
                 
                 required : "Email is required",
                 pattern :  { 
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                  message: "Invalid email format" 
                }
            })}
          />

{errors.email && <p className="text-red-500 absolute">{errors.email.message}</p>}

        </div>
  
        <div className="mt-4 relative ">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input 
            type={showpassword ? "":"password"}
            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" 
            placeholder="Enter your password" 
            name="password"
            // onChange={(e) => setlogindetails({ ...logindetails, [e.target.name]: e.target.value })}
            {...register("password" , {
                 
                required : "Password is required",
                minLength : {value : 6 , message : "password must be atleast 6 characters"}
            })}
          />

{errors.password && <p className="text-red-500 absolute">{errors.password.message}</p>}
          
          <button 
    type="button"
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"
    onClick={() => setshowpassword(!showpassword)}
  >
    {showpassword ? <FaEyeSlash /> : <FaEye />}
  </button>
          
        </div>
  
        <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Login
        </button>
      </form>
  
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
  
      <button onClick={()=>LoginwithGoogle()} className="w-full flex items-center justify-center bg-white border py-2 rounded-lg shadow-sm hover:shadow-md transition">
        <FcGoogle className="text-2xl mr-2" />
        Sign in with Google
      </button>
  
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?  
        <a href="/signup" className="text-blue-500 hover:underline"> Sign up</a>
      </p>
    </div>
  </div>
  
  );
}
