import PropTypes from "prop-types"; // Import PropTypes
import { propTypes } from "react-bootstrap/esm/Image";


function NavForQuiz({ questionNumber,timer,totalQuestions,quizName }) {
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg rounded-5 m-2 mx-4 px-4 py-2 text-light d-flex ">
        {/* Number of question */}
        <div className="col-md-5">
          <h3>
            {questionNumber}/{totalQuestions}
          </h3>
        </div>
        <h1 className="navbar-brand text-light col-md-6 fs-4 mt-2 px-4 fw-bold">
         {quizName}
        </h1>
        <div className="text-center pt-1">
          <h4>{timer}</h4>
        </div>
      </nav>
    </div>
  );
}

export default NavForQuiz;

NavForQuiz.propTypes = {
  questionNumber: PropTypes.string.isRequired,
  timer: PropTypes.string.isRequired,
  quizName: PropTypes.string.isRequired,
  totalQuestions:propTypes.number
};