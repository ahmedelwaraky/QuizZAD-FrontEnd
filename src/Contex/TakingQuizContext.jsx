import axios from "axios";
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const TakingQuizContext = createContext();

export const TakingQuizProvider = ({ children }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizAttemptId, setQuizAttemptId] = useState(null);
  const [studentScore, setStudentScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const settingQuizAttemptId = (id) => {
    setQuizAttemptId(id);
  };

  const resetSelectedAnswers = () => {
    setSelectedAnswers([]);
  };
  // Save the selected answers
  const handleAnswerSelect = (answerText, questionNumber, questionType) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      if (questionType === "MULTIPLE_CHOICE") {
        // If it's a multiple-choice question, group all selected answers in one array
        const updatedAnswers = prevSelectedAnswers.filter(
          (ans) => Object.keys(ans)[0] !== questionNumber.toString()
        );
  
        const currentAnswers =
          prevSelectedAnswers.find(
            (ans) => Object.keys(ans)[0] === questionNumber.toString()
          )?.[questionNumber] || [];
  
        return [
          ...updatedAnswers,
          {
            [questionNumber]: [...currentAnswers, answerText],
          },
        ];
      } else {
        // For other question types, keep only the last answer for the same question
        const updatedAnswers = prevSelectedAnswers.filter(
          (ans) => Object.keys(ans)[0] !== questionNumber.toString()
        );
  
        return [
          ...updatedAnswers,
          { [questionNumber]: [answerText] },
        ];
      }
    });
  };
  
  
  const submitQuiz = async () => {
    try {
      //   const flatAnswers = flattenAnswers(selectedAnswers);
      const requestBody = {
        attemptId: quizAttemptId,
        answers: selectedAnswers,
        passingScore: 50,
      };

      const response = await axios.put(
        "http://localhost:5000/api/v1/quiz-attempts/update-quiz-attempt",
        requestBody,
        {
          withCredentials: true,
        }
      );

      setStudentScore(response.data.score);
      setCorrectAnswers(response.data.totalCorrectAnswers);
      console.log(requestBody);
      // Handle success (show a message, redirect, etc.)
    } catch (error) {
      console.error("Error updating quiz attempt", error);
      // Handle error (show a message, redirect, etc.)
    }
  };

  return (
    <TakingQuizContext.Provider
      value={{
        handleAnswerSelect,
        settingQuizAttemptId,
        submitQuiz,
        resetSelectedAnswers,
        studentScore,
        selectedAnswers,
        correctAnswers,
      }}
    >
      {children}
    </TakingQuizContext.Provider>
  );
};
TakingQuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useTakingQuiz = () => {
  const context = useContext(TakingQuizContext);
  if (!context) {
    throw new Error("useTakingQuiz must be used within a TakingQuizProvider");
  }
  return context;
};
