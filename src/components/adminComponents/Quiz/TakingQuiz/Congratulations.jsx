import { useNavigate } from 'react-router-dom';
import Result from '../../../../assets/images/smart.png'
import PropTypes from 'prop-types';
import NavForResult from './NavForResult';
    
function Congratulations({score,numOfQuestions,correctAnswers,quizName}) {
    const navigate = useNavigate();
  
return (
    <div className='resultBackground'>
    <NavForResult quizName={quizName}/>
            <div className="container-fulid col-md-6 m-auto py-3 ">
                <div className="result text-center rounded-5 py-2 bg-light">
                    <div className="result-header p-3">
                        <h1 className=''>Congratulations</h1>
                    </div>
                    <div className="up bg-white mx-5 rounded-5 p-3 mb-2">
                        <div className="result-img">
                            <img className='resutlImage' src={Result}  />
                        </div>
                        <div className="result-degree">
                        <h2 className='h5' style={{color:"#7C2A90"}}>you get {score} of Quiz Degrees</h2>
                    </div>                 
                </div>
                <div className="down px-3 w-75 m-auto">
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
                    <div className="question-completion d-flex justify-content-around my-4">                      
                        <div className="div mx-1">
                        <button type="submit"  className='quizButton rounded-5 p-2' onClick={()=>{
                                navigate("/dashboard")
                            }}>Back to Dashboard</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
  )
}
Congratulations.propTypes = {
   
    score:PropTypes.number.isRequired,
    correctAnswers:PropTypes.number.isRequired,
    quizName:PropTypes.string.isRequired,
    numOfQuestions:PropTypes.number.isRequired
  };
export default Congratulations