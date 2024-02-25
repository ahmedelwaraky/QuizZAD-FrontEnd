import { useFormik } from "formik";
import { useContext } from "react";
import { QuestionContext } from "../../../../Contex/QuestionContext";

function Multiple_choicess() {
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
    <div>
      <h4 className="mb-4"> You can choose one or more</h4>
      {/*---- Options --- */}
      {[1, 2, 3, 4].map((optionIndex) => (
        <form
          key={optionIndex}
          onSubmit={(e) => {
            e.preventDefault();
            answerFormik.handleSubmit(e);
            answerFormik.values.isCorrect = e.target[0].checked;
            answerFormik.values.answerText = e.target[1].value;
            answerFormik.values.btn = `Option${optionIndex}`;
          }}
        >
          <div className="row mb-4">
            <label htmlFor={`option${optionIndex}`} className="form-label ">
              Option #{optionIndex}
            </label>
            <div className="col-md-1 pt-2 ">
              <input
                className="form-check-input"
                type="checkbox"
                name={`option${optionIndex}`}
              />
            </div>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control rounded-5 p-3"
                name={`option${optionIndex}`}
                aria-describedby="textHelp"
                onBlur={answerFormik.handleBlur}
                onChange={answerFormik.handleChange}
              />
              {answerFormik.touched[`option${optionIndex}`] &&
              answerFormik.errors[`option${optionIndex}`] ? (
                <div className="text-danger">
                  {answerFormik.errors[`option${optionIndex}`]}
                </div>
              ) : null}
            </div>
            <div className=" m-auto col-md-3">
              {/* If it's clicked switch */}
              {buttonState[`Option${optionIndex}`] != "Added" ? (
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
                  {buttonState[`Option${optionIndex}`]}
                </button>
              )}
            </div>
          </div>
        </form>
      ))}
    </div>
  );
}

export default Multiple_choicess;
