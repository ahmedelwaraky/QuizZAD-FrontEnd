import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes


export const QuestionContext = createContext();

export function QuestionContextProvider(props) {
  const [myQuestion, setMyQuestion] = useState({});
  const [buttonState, setButtonState] = useState({});
    const [quizId, setQuizId] = useState(null);
    const clearButtonState = () => {
      setButtonState({});
    };
    const handleButtonClick = (buttonName) => {
      //handleButtonClick for Add answer
      setButtonState((prevState) => ({
        ...prevState,
        [buttonName]: "Added",
      }));
    };
    
   
    // Funcs for Questions
    
  
    const handleQuestionForm = async (values) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        if (values[key] == "options") {
          values[key] = "MULTIPLE_CHOICE";
        }
        formData.append(key, values[key]);
      }
  
      const response = await axios.post(
        `http://localhost:5000/api/v1/quizzes/${quizId}/questions`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMyQuestion(response.data.question);
  handleButtonClick(values.btn)
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };
  
  //   answer form handler
   const handleAnswerForm = async (values) => {
    const formData = new FormData();  
  
    // Extract the relevant keys
    const { isCorrect, image, answerText, correctAnswerExplanation } = values;
    for (const key in values !="btn") {
      if (key.startsWith("option")) {
        var optionValue = values[key];
        var option = key; // to compare the correct answer
      } else if (key == "selectedOption") {
        var correctAnswer = values[key];
      }
    }
    // Modify answerText based on option
    const answerTextValue = optionValue || answerText; // Setting answerText to option if it exists
    const isCorrectValue =
      correctAnswer != undefined && correctAnswer == option
        ? true
        : false || isCorrect;
    console.log(isCorrectValue);
    // Append the keys to formData
    formData.append("isCorrect", isCorrectValue);
    formData.append("answerText", answerTextValue);
    formData.append("image", image);
    formData.append("correctAnswerExplanation", correctAnswerExplanation);
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/questions/${myQuestion.id}/answers`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response.data); // Handle the response as needed
      handleButtonClick(values.btn);
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  };
  
  
  const userData = { buttonState,handleAnswerForm,handleButtonClick,handleQuestionForm 
,setQuizId,clearButtonState
};

  return (
    <QuestionContext.Provider value={userData}>
      {props.children}
    </QuestionContext.Provider>
  );
}

QuestionContextProvider.propTypes = {
    children: PropTypes.node,
  };