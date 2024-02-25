import { useState, useRef, useEffect, useContext } from "react";
import Slider from "react-slick";
import NavForQuiz from "./NavForQuiz";
import QuestionStudentView from "./QuestionStudentView";
import axios from "axios";
import { useTakingQuiz } from "../../../../Contex/TakingQuizContext";
import { useNavigate, useParams } from "react-router-dom";
import Progressbar from "./Progressbar";
import { QuizContext } from "../../../../Contex/QuizContext";
import "../../../../assets/css/quiz.css";
import { Circles } from "react-loader-spinner";
import { UserContext } from "../../../../Contex/UserContext";
import { QuestionContext } from "../../../../Contex/QuestionContext";

function TakeQuiz() {
  // Quiz id
  const { id } = useParams();
  const quizId = parseInt(id, 10);
  const [loading, setLoading] = useState(true); // When load data
  const [allowedToAttempt, setAllowedToAttempt] = useState(true); // check no of attempts
  const [questionNumber, setQuestionNumber] = useState(1);
  const [quizName, setQuizName] = useState(null);
  const sliderRef = useRef(null);
  const [timer, setTimer] = useState(null); // Timer by seconds
  const [noTryingAllowed, setNoTryingAllowed] = useState(null); // number of allowed trying taking the quiz
  const [questions, setQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { getQuiz } = useContext(QuizContext); // get data from quiz by id
  const { myUser } = useContext(UserContext); // get data from User context
  const { settingQuizAttemptId, submitQuiz,resetSelectedAnswers } = useTakingQuiz(); //  useTakingQuiz hook in TakingQuizContextFile
  const { 
    clearButtonState} = useContext(QuestionContext); //  clearButtonState Function from QuestionContext file when finshing the quiz
  const navigate = useNavigate(); // navigate to any component

  useEffect(() => {
    // Fetch questions from the API using Axios
    const fetchQuestions = () => {
      axios
        .get(`http://localhost:5000/api/v1/quizzes/${quizId}/questions`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(quizId);
          setQuestions(response.data.questions);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setLoading(false);
        });
    };
    // Start quiz
    const startQuiz = () => {
      axios
        .post(
          "http://localhost:5000/api/v1/quiz-attempts/start-quiz-attempt",
          { quizId },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          settingQuizAttemptId(response.data.id);
        })
        .catch((error) => {
          if (
            error.response.data.message ==
            "You exceeded the maximum allowed attempts for this quiz."
          )
            setAllowedToAttempt(false);
          console.error("Error start quiz", error.response.data.message);
          // Handle error (show a message, redirect, etc.)
        });
    };
    // Getting Time and no. of trying attempt to the quiz
    getQuiz(quizId)
      .then((quizData) => {
        setTimer(quizData.data.quiz.duration * 60);
        setNoTryingAllowed(quizData.data.quiz.numOfAllowedAttempts);
        setQuizName(quizData.data.quiz.title);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });

    fetchQuestions(); // Fetch questions initially
    startQuiz();
  }, [quizId]);

  const handleNext = () => {
    setQuestionNumber((prevNumber) => prevNumber + 1);
    sliderRef.current.slickNext();
  };

  const handlePrevious = () => {
    setQuestionNumber((prevNumber) => prevNumber - 1);
    sliderRef.current.slickPrev();
  };
  // When finishing the quiz
  const finishQuiz = () => {
    submitQuiz();
    setIsSubmitted(false)
    setTimeout(() => {
      navigate(`/${quizId}/${questions.length}/result`);
      resetSelectedAnswers()
      clearButtonState()
    }, 1000);
  };

  useEffect(() => {
    // Timer of quiz
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]); // Include timer in the dependency array to re-run the effect when it changes

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");
  const formattedTime = `${minutes}:${seconds}`;

  const progress = ((timer / 3600) * 100).toFixed(2);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false, // Disable swipe
  };
  //---------------------- Check If user complete the quiz------------------------
  if (!allowedToAttempt) {
    return (
      <div className="quizViewBackground d-flex flex-column align-items-center justify-content-center">
        <section className="quizBackground d-flex flex-column align-items-center py-5 rounded-4">
          <h3 className="text-center mb-3">
            You already took the quiz {noTryingAllowed} times
          </h3>
          <div className="div mt-3">
            <button
              type="submit"
              className="btn text-white py-1 rounded-3 formBtn"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </section>
      </div>
    );
  } else if (loading) {
    // If questions didn't be retrieved
    return (
      <div style={{ margin: "5% 0 0 50%" }}>
        <Circles
          height={500}
          width={60}
          color="#89288F"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="quizViewBackground m-0">
      <Slider ref={sliderRef} {...settings}>
        {questions.map((q) => (
          <div key={q.id}>
            {/* ===========NavBar=========== */}
            <NavForQuiz
              quizName={quizName}
              questionNumber={questionNumber}
              timer={formattedTime}
              totalQuestions={questions.length}
            />
            <div style={{ position: "relative" }}>
              <Progressbar value={progress} />
              {/* ================ Questions view ================== */}
              <QuestionStudentView
                questionTitle={q.questionText}
                answers={q.answers}
                questionImage={`http://localhost:5000/static/${q.questionImage}`}
                questionId={q.id}
                questionNumber={questionNumber}
                quizIdProp={quizId}
                questionType={q.questionType}
              />
              {/* ------------------- Next & Back Buttons ---------- */}
              <div
                className="col-md-12 d-flex justify-content-between "
                id="nextBackBtn"
              >
                {questionNumber === 1 ? (
                  <div></div>
                ) : (
                  <button
                    type="submit"
                    className="arrowView mx-4 fs-6 "
                    onClick={handlePrevious}
                  >
                    <i className="fa-solid fa-arrow-left fs-3 px-1" />
                  </button>
                )}
                <div className="">
                  {questionNumber !== questions.length ? (
                    <button
                      type="submit"
                      className="arrowView mx-4 fs-6 "
                      onClick={handleNext}
                      disabled={questionNumber === questions.length}
                    >
                      <i className="fa-solid fa-arrow-right fs-3 px-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className=" arrowView mx-4 fs-5"                      
                      disabled={myUser.role == "ADMIN" ? true : false}
                      onClick={()=>setIsSubmitted(true)}
                    >
                      Finish
                    </button>
                  )}
                </div>
              </div>
              {/*End of Buttons  */}
            </div>
          </div>
        ))}
      
      </Slider>      
      {/*End of slider & Nav */}
    {/* If student click on finish Btn */}
      {isSubmitted && (
        <div className="isRemoved d-flex flex-column align-items-center justify-content-center bg-white">
          <section className="quizBackground d-flex flex-column align-items-center py-5 rounded-4">
            <h3 className="text-center mb-3">Are you sure that you answerd all questions?</h3>
            <div className="div mt-3 text-center d-flex">
              <div className="px-4">
                <button
                  className="btn text-white py-1  px-4 mx-4 rounded-3 formBtn "
                  onClick={finishQuiz}
                >
                  Yes
                </button>
              </div>
              <div className="px-4">
                <button
                  className="btn text-white py-1  rounded-3 formBtn"
                  onClick={() => {
                    setIsSubmitted(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;
