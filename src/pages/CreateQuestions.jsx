import QuestionForm from "../components/teacherComponents/Quiz/QuestionForm";

function CreateQuestions() {
  const [questionId, setQuestionId] = useState(1);

  return (
    <div>
      <QuestionForm />
      <div className="my-3 m-auto col-md-6">
        <button
          className="quizButton rounded-5 p-2 w-100"
          onClick={() => setQuestionId(questionId + 1)}
        >
          Add another question
        </button>
      </div>
    </div>
  );
}

export default CreateQuestions;
