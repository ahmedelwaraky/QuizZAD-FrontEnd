import { useContext } from "react";
import { useFormik } from "formik";
import { QuestionContext } from "../../../../Contex/QuestionContext";

function Multiple_options() {

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
    <>
    <h4 className="mb-4"> You can choose only one</h4>
    {/*---- Options --- */}
    {[1, 2, 3, 4].map((optionIndex) => (
      <form
        key={optionIndex}
        onSubmit={(e) => {
          e.preventDefault();
          answerFormik.values.isCorrect = e.target[0].checked;
          answerFormik.values.answerText = e.target[1].value;
          answerFormik.values.btn = `Option${optionIndex}`; // For prevent multible submiting
          answerFormik.handleSubmit(e);
        }}
      >
        <div className="row mb-5">
          <label
            htmlFor={`option${optionIndex}`}
            className="form-label"
          >
            Option #{optionIndex}
          </label>
          <div className="col-md-1 pt-2">
          
              <input
                className="form-check-input"
                type="checkbox"
                name="selectedOption"
                checked={
                  answerFormik.values.selectedOption ===
                  `option${optionIndex}`
                }
                onChange={() => {
                  answerFormik.setFieldValue(
                    "selectedOption",
                    `option${optionIndex}`
                  );
                  answerFormik.setFieldTouched("selectedOption", true);
                }}
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
  </>
  )
}

export default Multiple_options