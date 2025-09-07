import { useEffect, useState } from 'react'
import './App.css'
import questionData from '../question.json';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

useEffect(() =>{
  let interval;
  if(timer > 0 && !showScore){
    interval = setInterval(() =>{
     setTimer((prevTimer) => prevTimer - 1)
    },1000);
  }else{
    clearInterval(interval);
    setShowScore(true);
  }

  return () => clearInterval(interval);
}, [timer, showScore]);


  const handleAnswerClick = (selectedOption) => {
    if(selectedOption === questionData [currentQuestion].CorrectOption){
      setScore((prevScore) => prevScore + 1);
    }
    if(currentQuestion < questionData.length -1){
      setCurrentQuestion((prevQuestion) =>
      prevQuestion +1);
      setTimer(10);
    }
    else{
      setShowScore(true);
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }

  return (
    <>
      <div className="quiz-app w-100 md:w-200 p-5 bg-white rounded-xl">
        {showScore ? (
          <div className="score-section text-center">
          <h2 className='text-2xl font-bold mb-3'>Your Score : {score}</h2>
          <button onClick={handleRestartQuiz} className='px-2 py-1 border-1 rounded-xl bg-orange-500 text-white cursor-pointer ease-in-out brightness-100'>Restart</button>
        </div>
        ):(
           <div className="question-section w-full text-center">
          <h2 className='mt-3 text-blue-500 text-2xl font-bold'>Question {currentQuestion + 1}</h2>
          <p className='mb-5 text-black'>{questionData[currentQuestion].Question}</p>
          <div className="flex justify-center items-center w-full text-sm gap-5 options ">
            {questionData[currentQuestion].Options.map((option,index) => (
              <button key={index} onClick={()=> handleAnswerClick(option)} className='px-2 py-1 border-1 rounded-xl bg-blue-500 text-white cursor-pointer ease-in-out hover:bg-blue-600 brightness-100'>{option}</button>
            ))}
          </div>
          <div className="timer mt-5 text-xl text-gray-800">Time Left: <span className='font-bold'>{timer}s</span></div>
        </div>
        )}
       
      </div>
    </>
  )
}

export default App
