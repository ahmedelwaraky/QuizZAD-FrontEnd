import PropTypes from 'prop-types';
import NavForResult from './NavForResult';
import result from "../../../../assets/images/unfortunately.png"
import { useNavigate } from 'react-router-dom';
function Unfortunately({score,numOfQuestions,correctAnswers,quizName}) {
  const navigate = useNavigate();

  return (
    <div className='mt-1'>
    <NavForResult quizName={quizName}/>
    <section >
        <div className="container-fulid w-75 m-auto">
            <div className="result text-center mx-4 bg-light pb-1 pt-4 mt-2 rounded-4">
                <div className="result-header mb-3">
                    <h1 className=''>Unfortunately</h1>
                </div>
                <div className=" bg-white mx-auto rounded-5 w-50 mb-3">
                    <div className="">
                        <img className='' src={result} width={"75%"}/>
                    </div>
                    <div className="result-degree">
                        <h2 className='h5' style={{color:"#7C2A90"}}>you get {score} of Quiz Degrees</h2>
                    </div>
                    
                </div>
                <div className="down px-3 w-75 m-auto px-4">
                    <div className="question-completion d-flex justify-content-around">
                        <div className="div">
                            <h6>Question</h6>
                            <h6 className='fw-bold'>{numOfQuestions} Questions</h6>
                        </div>
                        <div className="div">
                            <h6>Question</h6>
                            <h6 className='fw-bold'>{numOfQuestions} Questions</h6>
                        </div>
                    </div>
                    <div className="question-completion d-flex justify-content-around mt-4">
                        <div className="div">
                            <h6>Correct Answers</h6>
                            <h6 className='fw-bold'>{correctAnswers}</h6>
                        </div>
                        <div className="div">
                            <h6>InCorrect Answers</h6>
                            <h6 className='fw-bold'>{numOfQuestions-correctAnswers}</h6>
                        </div>
                    </div>
                    <div className="question-completion d-flex justify-content-around my-2">                      
                        <div className="div mx-1">
                            <button type="submit"  className='quizButton rounded-5 p-2 mb-2' onClick={()=>{
                                navigate("/dashboard")
                            }}>Back to Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</div>
  )
}
Unfortunately.propTypes = {
   
    score:PropTypes.number.isRequired,
    correctAnswers:PropTypes.number.isRequired,
    quizName:PropTypes.string.isRequired,
    numOfQuestions:PropTypes.number.isRequired
  };
export default Unfortunately