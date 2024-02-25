import {useEffect,useContext ,useState  } from "react";
import { useParams   } from "react-router-dom";
import { useTakingQuiz } from "../Contex/TakingQuizContext";
import Congratulations from "../components/adminComponents/Quiz//TakingQuiz/Congratulations";
import Unfortunately  from "../components/adminComponents/Quiz//TakingQuiz/Unfortunately";
import { QuizContext } from "../Contex/QuizContext";



function Result() {
  const { id } = useParams();
  const quizId = parseInt(id, 10);
  const { questionsId } = useParams();
  const noQuestions = parseInt(questionsId, 10);  
  const { studentScore,correctAnswers} = useTakingQuiz(); //  useTakingQuiz hook in TakingQuizContextFile
  const { getQuiz } = useContext(QuizContext); // get data from quiz by id
  const [passingScore, setPassingScore] = useState(0);
  const [quizName, setQuizName] = useState(null);

  useEffect(() => {   
    // Getting no of questions
    getQuiz(quizId)
      .then((quizData) => {
        setPassingScore(quizData.data.quiz.passingScore )
        setQuizName(quizData.data.quiz.title)
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });


  }, [quizId]);
  console.log(passingScore)
  return (
    <div id="result">
        {studentScore>passingScore?
    <Congratulations score={studentScore}  numOfQuestions={noQuestions}
     correctAnswers={correctAnswers} quizName={quizName}/>   
     : 
      <Unfortunately score={studentScore}  numOfQuestions={noQuestions} 
     correctAnswers={correctAnswers} quizName={quizName}/>}
    
    </div>
  )
}

export default Result