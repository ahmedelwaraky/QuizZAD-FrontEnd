import axios from 'axios';
import { createContext } from 'react';
import PropTypes from 'prop-types';

const BaseUrl = "http://localhost:5000/api/v1/quizzes";

export const QuizContext = createContext();

export function QuizProvider(props) {
  // get all Quizzes
  const getAllQuizzes = () => {
    return axios.get(BaseUrl, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get public Quizzes
  const getPublicQuizzes = async () => {
    return await axios.get(`${BaseUrl}/public`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get Quiz by id
  const getMyQuiz = async () => {
    return await axios.get(`${BaseUrl}?filter=class`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get Quiz by id
  const getQuiz = async (quizId) => {
    return await axios.get(`${BaseUrl}/${quizId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  // create Quiz
  const CreateQuiz = (values) => {
    return axios.post(BaseUrl, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // update a specific Quiz
  const EditQuiz = (id, values) => {
    return axios.put(`${BaseUrl}/${id}`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // delete Quiz
  const DeleteQuiz = (id) => {
    return axios.delete(`${BaseUrl}/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // assign Quiz to Class
  const quizToClass = (quizId, classId) => {
    return axios.post(`${BaseUrl}/${quizId}/assign/${classId}`, null, {
      withCredentials: true,
    });
  };

  // assign Quiz to Class
  const quizOutClass = (quizId, classId) => {
    return axios.post(`${BaseUrl}/${quizId}/unassign/${classId}`, null, {
      withCredentials: true,
    });
  };

  // assign student to Quiz
  const studentQuiz = (id, values) => {
    return axios.put(`${BaseUrl}/${id}/students`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // create new Quiz Questions
  const setQuizQuestion = (quizId, values) => {
    return axios.post(`BaseUrl/${quizId}/questions`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get all Quiz Questions
  const getQuizQuestion = (quizId, values) => {
    return axios.post(`BaseUrl/${quizId}/questions`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const QuizData = {
    CreateQuiz,
    EditQuiz,
    getMyQuiz,
    DeleteQuiz,
    getAllQuizzes,
    getPublicQuizzes,
    getQuiz,
    quizToClass,
    quizOutClass,
    studentQuiz,
    setQuizQuestion,
    getQuizQuestion,
  };

  return (
    <QuizContext.Provider value={QuizData}>
      {props.children}
    </QuizContext.Provider>
  );
}

QuizProvider.propTypes = {
  children: PropTypes.node,
};
