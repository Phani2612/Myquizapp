import React, { useState, useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'

import { FaSignOutAlt} from 'react-icons/fa'
import { LuMenu } from "react-icons/lu"
import { AiOutlineClose } from "react-icons/ai";
import images from '../assets/images.jpg'

function Navbar() {

  const [showMenu, setshowmenu] = useState(false)

  const Navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setshowmenu(false); // Close menu if screen is resized above 640px
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const Logout = ()=>{

        localStorage.clear()

        Navigate('/')
        
  }

  return (
    <div className={`w-full h-16 left-0 top-0  p-10 bg-linear-to-r from-green-500 to-blue-500 sm:max-w-full ${showMenu ? "flex flex-col min-h-screen items-center gap-y-4" : "flex flex-row justify-between items-center"} `}  >


      <img src={images} className={`h-16 w-16  ${showMenu ? "block " : "hidden sm:block "}`} />

      <ul className={`
        ${showMenu ? "flex flex-col gap-y-4 justify-center opacity-100 scale-100" : "hidden sm:flex gap-x-4 opacity-100 scale-90"} 
        text-2xl transition-all duration-300`}>
        <li className='text-white hover:text-yellow-400'><Link>Home</Link></li>
        <li className='text-white hover:text-yellow-400'><Link>Pages</Link></li>
        <li className='text-white hover:text-yellow-400'><Link>Portfolio</Link></li>
        <li className='text-white hover:text-yellow-400'><Link>Blog</Link></li>
        <li className='text-white hover:text-yellow-400'><Link>Elements</Link></li>
      </ul>




      <FaSignOutAlt onClick={()=>Logout()} className='text-white w-7 h-7 hover:text-yellow-400 hidden sm:block ' />

      <div onClick={() => setshowmenu(!showMenu)} className='sm:hidden'>
        {showMenu ? <AiOutlineClose className='h-9 w-9' /> : <LuMenu className='h-9 w-9' />}
      </div>
    </div>
  )
}

export default Navbar