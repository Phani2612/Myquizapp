import React, { useState } from 'react'
import axios from 'axios'
import {useSnackbar} from 'notistack'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useForm} from 'react-hook-form'

function Signup() {

const [details , setdetails] = useState({
 
   email : '',
   mobile : '',
   password : '',
   confirm : ''
     
})

const { enqueueSnackbar } = useSnackbar();

const Navigate = useNavigate()

const [showpassword , setshowpassword] = useState(false)
const [showconfirm , setshowconfirm] = useState(false)


const {register , formState : {errors} , trigger , getValues , watch , getFieldState} = useForm()

const handleSubmit = async(e)=>{


  e.preventDefault()
  
 
  const isValid = await trigger()
  console.log("Isvalid" , isValid)
  


  if (!isValid) {
    // Get all form values & find first error field
    const fields = Object.keys(getValues()); 

    console.log("Field values" , fields)

    for (const field of fields) {
      const fieldError = getFieldState(field).error;

      console.log("Fielderror" , fieldError)
      if (fieldError) {
        enqueueSnackbar(fieldError.message, { variant: "error" });
        return;
      }
    }
  }


  const formValues = getValues()

  console.log("Formvalues", formValues)


  try{

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register` , formValues)

    const {message , redirect_url} = response.data

    console.log(response.data)

    enqueueSnackbar(message , {variant : 'success'})

    Navigate(redirect_url)
    

  }

  catch(error){

    console.error(error)

    enqueueSnackbar(error.response.data.message ,{ variant: 'error' })
  }


}





  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-5">


<div  className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md ">

  <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Sign Up</h1>
    
<form className='mt-6  ' method='POST' onSubmit={handleSubmit}   >

<div className='mb-5'>
      <label className="block text-sm font-medium text-gray-600">Email</label>
      <input 
        type="email" 
        className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" 
        placeholder="Enter your email"
        name = 'email' 
        // onChange={(e)=>setdetails({...details , [e.target.name] : e.target.value})}
        {...register("email" , {

             required : "Email is required",
             pattern : {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
              message: "Invalid email format" 
             }

        })}
      />

      {errors.email && <p className="text-red-500 absolute">{errors.email.message}</p>}
    </div>

    <div className='mb-5'>
          <label className='block text-sm font-medium text-gray-600'>Mobile:</label>
          <input name='mobile' className='w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-1 focus:ring-blue-400 outline-none' type='text' 
          // onChange={(e)=>setdetails({...details , [e.target.name] : e.target.value})} 
          placeholder='Enter mobile number'
           {...register("mobile" , {

              required : "Mobile number is required"
           })}
          />

          {errors.mobile && <p className='text-red-500 absolute'>{errors.mobile.message}</p>}
    </div>


    <div className='relative mb-5'>
          <label className='block text-sm font-medium text-gray-600'>Password:</label>
          <input name='password' className='w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-1 focus:ring-blue-400 outline-none'  type={showpassword ? "":"password"}
          //  onChange={(e)=>setdetails({...details , [e.target.name] : e.target.value})} 
placeholder='Enter your password'
                {...register("password" , {

                      required : "Password is required",
                      minLength : {value : 6 , message : "Atleast 6 characters required"}
                })}
           />

           {errors.password && <p className='text-red-500 absolute'>{errors.password.message}</p>}

          <button 
    type="button"
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"
    onClick={() => setshowpassword(!showpassword)}
  >
    {showpassword ? <FaEyeSlash /> : <FaEye />}
  </button>
          

    </div>


    <div className='relative mb-5'>
          <label className='block text-sm font-medium text-gray-600'>confirm:</label>
          <input name='confirm' className='w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-1 focus:ring-blue-400 outline-none' type={showconfirm ? "":"password"} 
          // onChange={(e)=>setdetails({...details , [e.target.name] : e.target.value})}
          {...register("confirm" , {
                 
            required : "Please confirm your password",
            validate : (value)=> value === watch('password') || "Passwords do not match"
        })}
           />

           {errors.confirm && <p className='text-red-500 absolute'>{errors.confirm.message}</p>}

          <button 
    type="button"
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"
    onClick={() => setshowconfirm(!showconfirm)}
  >
    {showconfirm ? <FaEyeSlash /> : <FaEye />}
  </button>
          
    </div>


    <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
      Sign Up
    </button>


</form>

</div>


    </div>
  )
}

export default Signup