import { useContext } from "react";
import { useFormik } from "formik";
import { QuestionContext } from "../../../../Contex/QuestionContext";

function Short_answer() {

    const { handleAnswerForm,buttonState } = useContext(QuestionContext); // get data from question Context



const answerFormik = useFormik({
    initialValues: {
      isCorrect: "false",
      answerText: "",
      image: null,
      correctAnswerExplanation: "No explaniation",
      btn: "",
    },
    onSubmit: handleAnswerForm,
  });
  return (
    <form
    onSubmit={(e) => {
      e.preventDefault();
      answerFormik.values.isCorrect = true;
      answerFormik.values.btn = `FillInTheBlank`;
      answerFormik.handleSubmit(e);
    }}
  >
      <label htmlFor="answer" className="form-label ps-1">
        Answer
      </label>
    <div className="row mb-3">
    <div className="col-md-9">
      <input
        type="text"
        className="form-control rounded-5 p-3"
        name="answerText"
        aria-describedby="textHelp"
        onBlur={answerFormik.handleBlur}
        onChange={answerFormik.handleChange}
      />
      </div>
      {answerFormik.touched.answer && answerFormik.errors.answer ? (
        <div className="text-danger">{answerFormik.errors.answer}</div>
      ) : null}
    <div className=" m-auto col-md-3">
      {/* If it's clicked switch */}
      {buttonState[`FillInTheBlank`] != "Added" ? (
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
          {buttonState[`FillInTheBlank`]}
        </button>
      )}
    </div>
    </div>
  </form>
  )
}

export default Short_answer