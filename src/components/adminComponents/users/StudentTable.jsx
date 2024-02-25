import { useContext, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { Container, NavLink, Table } from "react-bootstrap";
import { StudentUsersContex } from "../../../Contex/StudentUsersContex";
import { gradeLevelMap } from "../../../controls/gradeLevel";
import "../../../assets/css/Users.css";
import "../../../assets/css/class.css";
import { UserContext } from "../../../Contex/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TeacherTable() {
  const { myUser } = useContext(UserContext);
  const { StudentUsers, Loading, fetchStudentData } =
    useContext(StudentUsersContex); // fetch data from studentcontext
  const navigate = useNavigate(); // navigate to any component
  const [teacherName, setTeacherName] = useState(null); // set teacher name
  const [studentId, setStudentId] = useState(null); // set teacher id
  const [isRemoved, setIsRemoved] = useState(false);
  useEffect(() => {
    if (myUser.role === "ADMIN") {
      fetchStudentData();
    }
  }, []);
  const inactivateUser = async (profileId) => {
    const baseUrl = "http://localhost:5000/api/v1/";

    try {
      await axios.put(
        `${baseUrl}users/inactivate/${profileId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setIsRemoved(false);
      setTimeout(() => {
        navigate("/dashboard/user/");
      }, 1500);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  if (Loading) {
    return (
      <div className="w-100" style={{ marginLeft: "50%" }}>
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
    <Container>
      <div className=" px-2">
        <Table hover responsive className="userTable ">
          <thead className="custom-thead">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>grade</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="userBodyTable">
            {StudentUsers.map((student) => (
              <tr key={student.id}>
                <td>{student.id} </td>
                <td>
                  {student.profile?.firstName} {student.profile?.lastName}
                </td>
                <td>student</td>
                <td>{gradeLevelMap[student.profile?.gradeLevel]}</td>
                <td>{student.profile?.email}</td>
                <td>
                  <div className="p-0">
                    <NavLink
                      className="fa-solid fa-trash-can mx-3 fs-5 text-danger"
                      onClick={() => {
                        setTeacherName(
                          `${student.profile?.firstName} ${student.profile?.lastName}`
                        );
                        setStudentId(student.profileId);
                        setIsRemoved(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {isRemoved && (
        <div className="isRemoved d-flex flex-column align-items-center justify-content-center">
          <section className="quizBackground d-flex flex-column align-items-center py-5 rounded-4">
            <h3 className="text-center mb-3">You will remove {teacherName}</h3>
            <div className="div mt-3 text-center d-flex">
              <div className="px-4">
                <button
                  className="btn text-white py-1  px-4 mx-4 rounded-3 formBtn "
                  onClick={() => {
                    inactivateUser(studentId);
                  }}
                >
                  ok
                </button>
              </div>
              <div className="px-4">
                <button
                  className="btn text-white py-1  rounded-3 formBtn"
                  onClick={() => {
                    setIsRemoved(false);
                  }}
                >
                  cancle
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </Container>
  );
}
