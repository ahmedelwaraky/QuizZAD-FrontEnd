import { useContext, useState } from "react";
import { useFormik } from "formik";
import { QuestionContext } from "../../../../Contex/QuestionContext";
function True_False() {

const { handleAnswerForm,buttonState } = useContext(QuestionContext); // get data from question Context

const [isTrueChecked, setIsTrueChecked] = useState(false);
const [isFalseChecked, setIsFalseChecked] = useState(false);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();        
        answerFormik.values.isCorrect = e.target[0].checked;
        answerFormik.values.answerText = "true";
        answerFormik.values.btn = `True`;
        answerFormik.handleSubmit(e);
      }}
    >
      <div className="row mt-4">
        <div className="col-md-1 pt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              checked={isTrueChecked}
              onChange={() => {
                setIsTrueChecked(true);
                setIsFalseChecked(false); // Uncheck the other radio button
              }}
            />
          </div>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control rounded-5 p-3"
            name="True"
            aria-describedby="textHelp"
            value={"True"}
            readOnly
          />
        </div>
      <div className="mb-3 col-md-3">
        {/* If it's clicked switch */}
        {buttonState[`True`] != "Added" ? (
          <button
            type="submit"
            className="quizButton rounded-5 p-2"
          >
            Add
          </button>
        ) : (
          <button
            type="button"
            className="unclickableBtn  rounded-5 p-2 w-100"
          >
            {buttonState[`True`]}
          </button>
        )}
      </div>
      </div>

    </form>
    {/*---- false --- */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        answerFormik.values.isCorrect = e.target[0].checked;
        answerFormik.values.answerText = "false";
        answerFormik.values.btn = `False`;
        answerFormik.handleSubmit(e);
      }}
    >
      <div className="row mt-4">
        <div className="col-md-1 pt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              checked={isFalseChecked}
              onChange={() => {
                setIsTrueChecked(false); // Uncheck the other radio button
                setIsFalseChecked(true);
              }}
            />
          </div>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control rounded-5 p-3"
            name="False"
            aria-describedby="textHelp"
            value={"False"}
            readOnly
          />
        </div>
     
      <div className=" col-md-3">
        {/* If it's clicked switch */}
        {buttonState['False'] != "Added" ? (
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
            {buttonState[`False`]}
          </button>
        )}
      </div>
      </div>
    </form>
  </>
  )
}

export default True_False