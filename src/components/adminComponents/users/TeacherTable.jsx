import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import "../../../assets/css/Users.css";
import { Container, NavLink, Table } from "react-bootstrap";
import { TeacherUsersContex } from "../../../Contex/TeacherUsersContex";
import "../../../assets/css/class.css";
import axios from "axios";

export default function TeacherTable() {
  const { TeacherUsers, Loading, fetchTeacherData } =
    useContext(TeacherUsersContex); // fetch data from teachercontext
  const navigate = useNavigate(); // navigate to any component
  const [teacherName, setTeacherName] = useState(null); // set teacher name
  const [teacherId, setTeacherId] = useState(null); // set teacher id
  const [isRemoved, setIsRemoved] = useState(false);
  const baseUrl = "http://localhost:5000/api/v1/";

  const inactivateUser = async (profileId) => {
    try {
      await axios.put(
        `${baseUrl}users/inactivate/${profileId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        navigate("/dashboard/user/");
      }, 1500);
      setIsRemoved(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, []);

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
      <div className="Scroller px-2">
        <Table hover responsive className="userTable">
          <thead className="custom-thead">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Specialisation</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="userBodyTable">
            {TeacherUsers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id} </td>
                <td>
                  {teacher.profile?.firstName} {teacher.profile?.lastName}
                </td>
                <td>teacher</td>
                <td>{teacher.profile?.specialization}</td>
                <td>{teacher.profile?.email}</td>
                <td>
                  <div className="p-0">
                    <NavLink
                      className="fa-solid fa-trash-can mx-3 fs-5 text-danger"
                      onClick={() => {
                        setTeacherName(
                          `${teacher.profile?.firstName} ${teacher.profile?.lastName}`
                        );
                        setTeacherId(teacher.profileId);
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
                    inactivateUser(teacherId);
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
