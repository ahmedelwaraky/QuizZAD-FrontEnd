import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTakingQuiz } from "../../../../Contex/TakingQuizContext";
import { useContext, useState } from "react";
import "../../../../assets/css/quiz.css";
import { QuestionContext } from "../../../../Contex/QuestionContext";

function QuestionStudentView({
  questionTitle,
  questionImage,
  answers,
  questionId,
  questionType,
  questionNumber,
}) {
  const { handleButtonClick, buttonState } = useContext(QuestionContext); // get data from question Context
  const { handleAnswerSelect } = useTakingQuiz(); // Use the useTakingQuiz hook in TakingQuizContext
  const [buttonBgColors, setButtonBgColors] = useState(
    Array(answers.length).fill("")
  );
  const [buttonColor, setButtonColor] = useState(
    Array(answers.length).fill("")
  );

  // const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]);
  //----------------------------------------------------------------- Func when clicked

  const handleMultibleAnswer = (index, questionType) => { // For Multible_choices
    // Toggle the selected state of the clicked button
    const isSelected = selectedAnswerIndices.includes(index);
    const updatedIndices = isSelected
      ? selectedAnswerIndices.filter((i) => i !== index)
      : [...selectedAnswerIndices, index];
  
    // Update the bg color for all selected buttons
    const updatedBgColors = Array(answers.length).fill("");
    updatedIndices.forEach((i) => (updatedBgColors[i] = "#560283"));
    setButtonBgColors(updatedBgColors);
  
    // Update the color for all selected buttons
    const updatedColors = Array(answers.length).fill("");
    updatedIndices.forEach((i) => (updatedColors[i] = "#ffff"));
    setButtonColor(updatedColors);
  
    setSelectedAnswerIndices(updatedIndices)
  
  
    // Update the answer selection function based on question type
    handleAnswerSelect(
      answers[index].answerText,
      answers[index].questionId,
      questionType
    );
  };

  const handleAnswerClick = (index, questionType) => {
    // Toggle the selected state of the clicked button
    const isSelected = selectedAnswerIndices.includes(index);
    const updatedIndices = isSelected
      ? selectedAnswerIndices.filter((i) => i !== index)
      : [index];

    // Update the bg color for all selected buttons
    const updatedBgColors = Array(answers.length).fill("");
    updatedIndices.forEach((i) => (updatedBgColors[i] = "#560283"));
    setButtonBgColors(updatedBgColors);

    // Update the color for all selected buttons
    const updatedColors = Array(answers.length).fill("");
    updatedIndices.forEach((i) => (updatedColors[i] = "#ffff"));
    setButtonColor(updatedColors);

    setSelectedAnswerIndices(updatedIndices);

    // Update the answer selection function based on question type
    handleAnswerSelect(
      answers[index].answerText,
      answers[index].questionId,
      questionType
    );
  };

  return (
    <div
      className="col-md-6 quizBackground  p-4 m-auto rounded-4"
      id="takeQuiz"
    >
      {/*-------------------------------- Image-------------------- */}
      <img
        src={questionImage}
        alt="Question"
        style={{
          width: "30rem",
          height: "260px",
          objectFit: "fill",
        }}
        className="m-auto rounded-5 my-2"
        id="questionImgStudent"
      />
      <h3 className="text-center my-3">
        Question {questionNumber}: {questionTitle}
      </h3>
      <Row className="">
        {answers.map((answer, index) => (
          <Col
            lg={5}
            sm={10}
            key={answer.id}
            className="mx-auto my-1 justify-content-around"
          >
            {/*--------- Checking question type -----------------------*/}
            {questionType == "FILL_IN_THE_BLANK" ? (
              <form
                className="my-1 ms-auto"
                onSubmit={(e) => {
                  handleAnswerSelect(e.target[0].value, questionId);
                  // setSelectedAnswerIndex(index);
                  handleButtonClick(`Add${questionId}`);
                  e.preventDefault();
                }}
              >
                <div className="row">
                  <div className="col-md-12 w-100">
                    <input
                      style={{
                        border: "1px solid grey",
                      }}
                      type="text"
                      className="form-control rounded-5 p-3"
                      name="answerText"
                      aria-describedby="textHelp"
                    />
                  </div>
                  {/* Added Btn */}
                  <div className="col-md-2 w-50 p-3 m-auto">
                    {buttonState[`Add${questionId}`] != "Added" ? (
                      <button
                        type="submit"
                        className="quizButton rounded-5 p-2 w-100"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="unclickableBtn rounded-5 p-2 w-100"
                      >
                        {buttonState[`Add${questionId}`]}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ) : questionType == "MULTIPLE_CHOICE" ? (
              <button
                type="button"
                className={`answerViewBtn rounded-4 py-2 fs-5 my-1 `}
                style={{
                  backgroundColor: buttonBgColors[index],
                  color: buttonColor[index],
                }}
                onClick={() => handleMultibleAnswer(index, questionType)}
              >
                {index == 0 && `${answer.answerText}`}
                {index == 1 && `${answer.answerText}`}
                {index == 2 && `${answer.answerText}`}
                {index == 3 && `${answer.answerText}`}
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  className={`answerViewBtn rounded-4 py-2 fs-5 my-1 `}
                  style={{
                    backgroundColor: buttonBgColors[index],
                    color: buttonColor[index],
                  }}
                  onClick={() => handleAnswerClick(index, questionType)}
                
                >
                  {index == 0 && `${answer.answerText}`}
                  {index == 1 && `${answer.answerText}`}
                  {index == 2 && `${answer.answerText}`}
                  {index == 3 && `${answer.answerText}`}
                </button>
              </div>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
}

QuestionStudentView.propTypes = {
  questionTitle: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questionImage: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      answerText: PropTypes.number.isRequired,
      questionId: PropTypes.string.isRequired,
    })
  ).isRequired,
  questionId: PropTypes.number.isRequired,
  questionType: PropTypes.string.isRequired,
};

export default QuestionStudentView;
