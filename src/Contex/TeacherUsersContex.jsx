import axios from "axios";
import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const BaseUrl = "http://localhost:5000/api/v1/"

export const TeacherUsersContex = createContext();

export function TeacherUsersContexProvider(props) {
  
  const [TeacherUsers, setTeacherUsers] = useState([]);
  const [ Loading  , setLoading ] =useState(false)

  const fetchTeacherData = async () => {
    setLoading(true)

    try {
      const response = await axios.get(`${BaseUrl}teachers/`,
         {
            withCredentials: true,
          },
          );
          if (response.data) {
            setTeacherUsers(response.data);
    setLoading(false)

          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
    setLoading(false)
        }
    };
 

  // search for specific teacher
  const searchTeachers = (teacherName) => {
    return axios.get(`${BaseUrl}teachers/?name=${teacherName}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };


  const TeacherData = { TeacherUsers,Loading, fetchTeacherData, searchTeachers };

  return (
    <TeacherUsersContex.Provider value={TeacherData}>
      {props.children}
    </TeacherUsersContex.Provider>
  );
}

TeacherUsersContexProvider.propTypes = {
  children: PropTypes.node,
};
