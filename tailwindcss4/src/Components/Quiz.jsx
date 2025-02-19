import React, { useEffect, useState , useRef } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import ScoreModal from './Scoreboard'
import Loader from '../Loader'
import {FaRegClock} from 'react-icons/fa'
import { useParams } from 'react-router-dom'

function Quiz() {

    const [Questions, setquestions] = useState([])

    const [questionindex , setquestionindex] = useState(0)
    const [answerindex , setanswerindex] = useState({})

    const [totalScore, setTotalScore] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [isloading , setisloading] = useState(false)

    const {id} = useParams()


    const urls = {

        1 : 'https://opentdb.com/api.php?amount=10&category=18&type=multiple',

        2 : 'https://opentdb.com/api.php?amount=10&category=20',

        3 : 'https://opentdb.com/api.php?amount=10&category=23'
    }
   

    const options = {

        0 : 'a',
        1 : 'b',
        2 : 'c',
        3 : 'd'
    }


   

    const [time, setTime] = useState(Math.floor(60 / 60) - 1); // Minutes
    const [seconds , setseconds] = useState(60)
    const [scoreIndex, setScoreIndex] = useState({});  

   
  console.log("questions" , Questions)

    useEffect(() => {
        const timer = setInterval(() => {
          setseconds((prevSeconds) => {
            if (time === 0 && prevSeconds === 1) {
              clearInterval(timer); // Stop the timer completely
              setIsModalOpen(!isModalOpen)
              return 0; // Ensure seconds stay at 0
            }
    
            if (prevSeconds === 1) {
              setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
              return 59; // Reset seconds to 59 after reducing minutes
            }
    
            return prevSeconds - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer);  
      }, [time, setIsModalOpen]);



     


    const increaseIndex = (Qindex)=>{

        if(Qindex < Questions.length - 1){

            return setquestionindex(Qindex + 1)

        }

        return null

    }



    const decreaseIndex = (Qindex)=>{

        if(Qindex > 0){

            return setquestionindex(Qindex - 1)
        }

        return null
    }







    const fetchQuestions = async () => {

        setisloading(true)

        try {
            const response = await axios.get(
                urls[id]
            );

            const formattedquestions = response.data.results.map((q) => {

                const alloptions = [...q.incorrect_answers, q.correct_answer]
                return {
                    ...q,

                    options: alloptions
                }
            })

            setquestions(formattedquestions)


            setisloading(false)

        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);



    const AnswerSelection = (Selectedoption , correct_answer , QINDEX , AINDEX)=>{

       
        setanswerindex((prev) => ({
            ...prev,
            [QINDEX]: AINDEX, // Store selected answer for this specific question
        }));
            

            setScoreIndex(prev=>{

                let newScoreIndex = {...prev}

                if(correct_answer === Selectedoption){
                    newScoreIndex[QINDEX] = 1
                }

                else{
                    newScoreIndex[QINDEX] = 0
                }


                return newScoreIndex
            })

    }





const calculateTotal = () => {
    const score = Object.values(scoreIndex).reduce((acc, val) => acc + val, 0);
    setTotalScore(score); // Store total score in state
    setIsModalOpen(true); // Open modal
};



   


    return (
        <Layout>
            {isloading && <Loader/>}
            <div className='bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4'>

                <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-xl shadow-lg w-30 sm:w-48 mb-10  ">
      {/* Clock Icon & Label */}
      <div className="flex items-center gap-2 text-lg font-semibold">
        <FaRegClock className="text-yellow-300 animate-pulse" size={24} />
        <span className="uppercase tracking-wide">Time Left</span>
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center mt-2   ">
        <svg className="w-16 h-16">
          <circle
            className="text-gray-300"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="32"
            cy="32"
          />
          <circle
            className="text-yellow-300 transition-all duration-1000"
            strokeWidth="4"
            strokeDasharray="188"
            strokeDashoffset={((time * 60 + seconds) / 120) * 188}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="32"
            cy="32"
          />
        </svg>
        <h1 className="absolute text-2xl font-bold">
          {time}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      </div>
    </div>

            {isModalOpen && <ScoreModal totalScore={totalScore} onClose={() => setIsModalOpen(false)} />}


                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl h-full ">
                    {Questions.length > 0 ? (
                        Questions.map((i, index) => {
                            if (index === questionindex) {
                                return (
                                    <div key={index}>
                                        {/* Question Number and Text */}
                                        <div className="flex items-center gap-x-4">
                                            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-black bg-green-300 font-bold aspect-square">
                                                {index + 1}
                                            </span>
                                            <h1 className='text-xl font-bold'>{i.question}</h1>
                                        </div>
    
                                        {/* Options */}
                                        <div className='flex flex-col gap-y-4 mt-6'>
                                            {i.options.map((option, indexx) => (
                                                <div key={indexx} className="flex items-center gap-x-4">
                                                    <span className="w-6 h-6 flex items-center justify-center rounded-full border border-black bg-green-300 font-bold text-sm aspect-square">
                                                        {options[indexx]}
                                                    </span>
                                                    <h1 onClick={()=>AnswerSelection(option , i.correct_answer , index , indexx)}      className={`text-md border-2 border-black p-2 rounded-md w-full cursor-pointer ${answerindex[index] === indexx ?  "bg-green-400 text-white" : "bg-white"} `}>
                                                        {option}
                                                    </h1>
                                                </div>
                                            ))}
                                        </div>



                                  {questionindex < Questions.length-1? (
                                     <div className='flex justify-between mt-5' >
                                     <button  onClick={()=>decreaseIndex(questionindex)}   className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 cursor-pointer ">
    Prev
  </button>



  {/* <h1 className='text-green-400 text-xl' >{time}</h1> */}
  
  
  <button onClick={()=>increaseIndex(questionindex)}   className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 cursor-pointer">
    Next
  </button>
                                     </div>

                                  ) :(

                                    <div className='text-center mt-2'>

<button onClick={()=>calculateTotal()}  className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-yellow-600  cursor-pointer">
    Submit
  </button>
                                    </div>

                                  )}





                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (
                        <h1 className="text-center text-lg font-bold">Loading Questions...</h1>
                    )}
                </div>

              

            </div>
        </Layout>
    );
}

export default Quiz