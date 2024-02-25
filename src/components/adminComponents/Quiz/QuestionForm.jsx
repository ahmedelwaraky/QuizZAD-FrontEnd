import "../../../assets/css/Question.css";
import "../../../assets/css/quiz.css";
import { useContext, useState,useEffect } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types"; // Import PropTypes
import { useParams } from "react-router-dom";
import Multiple_choicess from "./questions types/Multiple_choicess";
import Multiple_options from "./questions types/Multiple_options";
import Short_answer from "./questions types/Short_answer";
import True_False from "./questions types/True_False";
import { QuestionContext } from "../../../Contex/QuestionContext";

function QuestionForm() {
  const { id } = useParams();
  const quizId = parseInt(id, 10);
  const [selectedOption, setSelectedOption] = useState("0");
  const { setQuizId,handleQuestionForm,buttonState,clearButtonState } = useContext(QuestionContext); // get data from question Context
setQuizId(quizId)
useEffect(() => {
  // Clear buttonState when the component mounts
  clearButtonState();
}, []); // Empty dependency array ensures this effect runs only once on mount

  const handleOptionChange = (event) => {
    //handleOptionChange for questions type
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  // Functions
  const formik = useFormik({
    initialValues: {
      questionType: selectedOption,
      questionText: "",
      gradePoints: "0",
      questionImage: null,
      btn:""
    },
    onSubmit: handleQuestionForm,
  });
  
  return (
    <div className="QuestionComponent py-5 bg-light">
      <form
        onSubmit={(e) => {
          // submitted the form
          e.preventDefault();
          formik.values.btn="AddQuestion"
          formik.handleSubmit(e);
        }}
        onChange={(e) => {
          e.preventDefault();
          console.log("Form changed");
        }}
        className="questionForm col-md-8 m-auto rounded-4 w-100 "
        encType="multipart/form-data"
      >
        {/* Your form fields... */}

        <div className=" mb-3">
          <label htmlFor="questionType" className="form-label px-1">
            Question Type
          </label>
          <select
            className="form-select rounded-5 p-3"
            name="questionType"
            onChange={(e) => {
              handleOptionChange(e);
              formik.handleChange(e);
            }}
            value={selectedOption}
          >
            <option value="0">Select your question</option>
            <option value="MULTIPLE_CHOICE">Multiple Choices</option>
            <option value="options">Multiple Options</option>
            <option value="FILL_IN_THE_BLANK">Short Answer</option>
            <option value="TRUE_FALSE">True & False</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="uploaded_file" className="form-label px-1">
            Image
          </label>
          <input
            type="file"
            className="form-control p-3 rounded-4"
            name="questionImage" // Change to "image"
            onChange={(e) => {
              formik.setFieldValue("questionImage", e.target.files[0]);
            }}
          />
        </div>
        <div className=" mb-3">
          <label htmlFor="option" className="form-label px-1">
            Question
          </label>
          <input
            type="menu"
            className="form-control rounded-5 p-3"
            name="questionText"
            aria-describedby="textHelp"
            value={formik.values.questionText}
            onChange={formik.handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="QuestionDegree" className="form-label px-1">
            Question Degree
          </label>
          <select
            className="form-select rounded-5 p-3"
            name="gradePoints"
            value={formik.values.gradePoints}
            onChange={formik.handleChange}
          >
            <option >Choose degree</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div className="mb-3 m-auto col-md-8">
          {buttonState[`AddQuestion`] != "Added" ? (
            <button type="submit" className="quizButton rounded-5 p-2 w-100">
              Add Question
            </button>
          ) : (
            <button type="button" className="unclickableBtn rounded-5 p-2 w-100">
              {buttonState[`AddQuestion`]}
            </button>
          )}
        </div>
      </form> {/* End of question Form */}
{
  /*
  *
  *
 ---------------------------------------------------------- Answers form ------------------------------------------------------------*
  * 
  * 
  * */
}
      <h3 className="text-center">
        Add all answers & choose the correct Answer
      </h3>
      <div className="questionForm col-md-8 m-auto rounded-4 w-100 bg-none">
        {/* Multiple Choices*/}
        {selectedOption === "MULTIPLE_CHOICE" && (
          <Multiple_choicess/>
        )}
        {/*  Multible Options */}

        {selectedOption === "options" && (
        <Multiple_options/>
        )}

        {/*  Fill in the Blank */}
        {selectedOption === "FILL_IN_THE_BLANK" && (
         <Short_answer/>
        )}

        {/*  True OR False */}
        {selectedOption === "TRUE_FALSE" && (
      <True_False/>
        )}
      </div>
    </div> //End of component
  );
}

QuestionForm.propTypes = {
  quizId: PropTypes.string,
};
export default QuestionForm;
