import { Accordion } from "react-bootstrap";
import "../../../assets/css/quiz.css";
import { useQuizLogic } from "../../../controls/QuizLogic";
import { useNavigate } from "react-router-dom";

export function AssignedQuestion() {
  const { handleAddQuestionClick, questions, id } = useQuizLogic();
  const navigate = useNavigate(); // navigate to any component

  return (
    <div className="m-2 mt-3">
      <section className="rounded-4 py-4 bg-light Scroller">
        <div className="container p-0">
          <div className="row mb-4">
            <div className="col-md-4 col-xl-10 text-center m-auto p-2 mt-1 rounded-4">
              <h3 className="p-2">Assign Questions</h3>
            </div>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <hr />
        </div>
        <div className="m-3 m-auto col-md-6">
          <button
            type="button"
            className="quizButton rounded-4 p-3 w-100"
            onClick={handleAddQuestionClick}
          >
            Add A New Question
          </button>
        </div>
        <Accordion className="col-md-10 m-auto" defaultActiveKey="null">
          {questions}
        </Accordion>

        <div className="col-md-8 m-auto">
          <hr />
        </div>
        <div className="m-3 m-auto col-md-6">
          <button type="submit" className="quizButton rounded-4 fs-5 p-3 w-100" 
          onClick={()=>navigate(`/dashboard/quiz/${id}`)}
          >
             Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
