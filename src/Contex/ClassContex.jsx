import axios from "axios";
import { createContext } from "react";
import PropTypes from "prop-types";

const BaseUrl = "http://localhost:5000/api/v1/classes";

export const ClassContext = createContext();

export function ClassProvider(props) {
  // get all classes
  const getAllClasses = () => {
    return axios.get(BaseUrl, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // get class by id
  const getClass = (id) => {
    return axios.get(`${BaseUrl}/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  // create Class
  const CreateClass = (values) => {
    return axios.post(BaseUrl, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // update a specific class
  const EditClass = (id, values) => {
    return axios.put(`${BaseUrl}/${id}`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // delete Class
  const DeleteClass = (id) => {
    return axios.delete(`${BaseUrl}/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // assign teacher to class
  const teacherToClass = (id, teacherId) => {
    return axios.put(`${BaseUrl}/${id}/add-teachers/${teacherId}`, null, {
      withCredentials: true,
    });
  };
  
  // assign teacher to class
  const teacherOutClass = (id, teacherId) => {
    return axios.put(`${BaseUrl}/${id}/remove-teachers/${teacherId}`, null, {
      withCredentials: true,
    });
  };

  // assign student to class
  const studentToClass = (id, teacherId) => {
    return axios.put(`${BaseUrl}/${id}/add-students/${teacherId}`, null, {
      withCredentials: true,
    });
  };
  
  // assign student to class
  const studentOutClass = (id, teacherId) => {
    return axios.put(`${BaseUrl}/${id}/remove-students/${teacherId}`, null, {
      withCredentials: true,
    });
  };

  // get student or teacher Classes
  const myClasses = () => {
    return axios.get(`${BaseUrl}/my-classes`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // search for specific Classes
  const searchClass = (className) => {
    return axios.get(`${BaseUrl}?className=${className}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };


  const classData = {
    CreateClass,
    EditClass,
    DeleteClass,
    getAllClasses,
    getClass,
    teacherToClass,
    teacherOutClass,
    studentToClass,
    studentOutClass,
    myClasses,
    searchClass
  };

  return (
    <ClassContext.Provider value={classData}>
      {props.children}
    </ClassContext.Provider>
  );
}

ClassProvider.propTypes = {
  children: PropTypes.node,
};
