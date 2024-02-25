import axios from "axios";
import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const BaseUrl = "http://localhost:5000/api/v1/students/";


export const StudentUsersContex = createContext();

export function StudentUsersContexProvider(props) {
  const [StudentUsers, setStudentUsers] = useState([]);
  const [ Loading  , setLoading ] =useState(false)
  const fetchStudentData = async () => {
    setLoading(true)

    try {
      const response = await axios.get(BaseUrl,
        {
          withCredentials: true,
        },
        );
        
        if (response.data) {
          setStudentUsers(response.data);
    setLoading(false)

        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
    setLoading(false)

      }
    };
  // search for specific Classes
  const searchStudents = (studentName) => {
    return axios.get(`${BaseUrl}?name=${studentName}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const StudentData = { StudentUsers,Loading, fetchStudentData, searchStudents };

  return (
    <StudentUsersContex.Provider value={StudentData}>
      {props.children}
    </StudentUsersContex.Provider>
  );
}

// Add prop validation for the 'children' prop
StudentUsersContexProvider.propTypes = {
  children: PropTypes.node,
};
