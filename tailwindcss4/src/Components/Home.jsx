import React from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'

function Home() {





    return (

        <Layout>

            <div className='flex flex-col justify-center items-center p-4 gap-y-4 '>


                <div className="p-6 text-center  ">
                    <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
                    <p>This is the home page content.</p>
                </div>



                <div className='text-center'>
                    <h1 className='text-2xl font-bold'>Computer engineering</h1><Link to='/quiz/1'><button className='bg-green-500 p-4 cursor-pointer rounded-lg w-48 text-2xl '  >Start Quiz</button></Link>
                </div>


                <div className='text-center'>
                   <h1 className='text-2xl font-bold'>Entertainment</h1><Link to='/quiz/2'><button className='bg-green-500 p-4 cursor-pointer rounded-lg w-48 text-2xl '  >Start Quiz</button></Link>
                </div>


                <div className='text-center'>
                    <h1 className='text-2xl font-bold'>Mythology</h1><Link to='/quiz/3'><button className='bg-green-500 p-4 cursor-pointer rounded-lg w-48 text-2xl '  >Start Quiz</button></Link>
                </div>









            </div>
        </Layout>
    )
}

export default Home