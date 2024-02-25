import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Circles } from "react-loader-spinner";
import { NavLink, useParams } from "react-router-dom";
import "../../../assets/css/class.css";
import { gradeLevelMap } from "../../../controls/gradeLevel";
import { ClassContext } from "../../../Contex/ClassContex";
import { UserContext } from "../../../Contex/UserContext";

export function ClassView() {
  const { id } = useParams();
  const [myClass, setMyClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const { getClass } = useContext(ClassContext);
  const { myUser } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const response = await getClass(id);
      setMyClass(response.data);
      
      const imageName = response.data.coverImage;
      const imageUrl = `http://localhost:5000/static/${imageName}`;
      setImageURL(imageUrl);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      console.log(imageURL);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-100" style={{marginLeft:"50%"}}>
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
    <div className="row ">
      {/*----------------- class image and details --------------------*/}
      <div className="col-md-6 text-light pt-2 ">
        <div className="bg-light border p-2 rounded-5">
          <div className="text-center">
            <a href="#">
              <img
                className="rounded-5 img-fluid shadow mt-2"
                src={imageURL}
                alt="myClass Image"
                style={{ width: "95%", height: "250px", objectFit: "cover" }}
                // crossOrigin="anonymous"
              />
            </a>
          </div>
          <div className="col-md-3 my-2">
            <span className="badge bg-warning p-2 mx-3 b-3 fs-6 rounded-5 w-100">
              {myClass.difficultyLevel}
            </span>
          </div>

          <div className="p-2">
            <h4
              className="mx-3 text-truncate text-dark"
              style={{ maxWidth: "100%" }}
            >
              <i
                className="fa fa-solid fa-landmark fs-3 me-3"
                style={{ color: "#89288F" }}
              />
              {myClass.className}
            </h4>
          </div>

          <div className="px-1">
            {/* <span className="badge bg-warning mb-2 b-3 fs-6 rounded-5">Intermediate</span> */}
            <h6
              className="mx-3 text-truncate text-dark"
              style={{ maxWidth: "100%" }}
            >
              Description : {myClass.description}
            </h6>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="p-2 mx-3 text-dark" style={{ maxWidth: "100%" }}>
                <i
                  className="fa fa-solid fa-user-graduate fs-5 me-3"
                  style={{ color: "#89288F" }}
                />
                {gradeLevelMap[myClass.gradeLevel]}
              </h6>
            </div>
            <div className="col-md-6">
              <h6 className="p-2 mx-3 text-dark" style={{ maxWidth: "100%" }}>
                <i
                  className="fa fa-brands fa-artstation fs-5 me-3"
                  style={{ color: "#89288F" }}
                />
                No. Quizzes : {myClass.classQuizzes.length}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="p-2 mx-3 text-dark" style={{ maxWidth: "100%" }}>
                <i
                  className="fa fa-light fa-chalkboard-user fs-6 me-3"
                  style={{ color: "#89288F" }}
                />
                No. teachers : {myClass.teachers.length}
              </h6>
            </div>

            <div className="col-md-6">
              <h6
                className="p-2 mx-3 text-truncate text-dark"
                style={{ maxWidth: "100%" }}
              >
                <i
                  className="fa fa-light fa-graduation-cap fs-6 me-3"
                  style={{ color: "#89288F" }}
                />
                No. students : {myClass.students.length}
              </h6>
            </div>
            <div className="d-flex">
            { myUser?.role =='ADMIN' && <NavLink
              className=" m-3 p-2 text-center rounded-5 quizButton fs-5 "
              to="members"
            >
              Add members
            </NavLink>}
            <NavLink
              className=" m-3 p-2 text-center rounded-5 quizButton fs-5 "
              to="quizzes"
            >
              View Quizzes
            </NavLink>
          </div>
          </div>
        </div>
      </div>

      {/*----------------- class Specific and details --------------------*/}
      <div className="col-md-6 text-light pt-2 Scroller">
        <div className="bg-light border p-3 rounded-5">
          <div className="ps-2">
            <h4 className="mx-1 text-truncate text-dark text-center">
              Class Teachers
            </h4>
          </div>
          {/*-------- table ------*/}
          <div className="">
          <div>
            <Table hover responsive className="mt-2 userTable">
              <thead className="custom-thead">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>specialization</th>
                </tr>
              </thead>
              <tbody className="userBodyTable">
                {myClass.teachers && myClass.teachers.map((teacher) =>(
                <tr key={teacher.id} >
                  <td>{teacher.id}</td>
                  <td>{teacher.profile.firstName} {teacher.profile.lastName}</td>
                  <td>{teacher.profile.specialization}</td>
                </tr>
                ))}

              </tbody>
            </Table>
          </div>
          <div>
          <div className="ps-2">
            <h4 className="mx-1 text-truncate text-dark text-center">
              Class Students
            </h4>
          </div>
            <Table hover responsive className="mt-2 userTable">
              <thead className="custom-thead">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>grade level</th>
                </tr>
              </thead>
              <tbody className="userBodyTable">
                {myClass.students && myClass.students.map((student) =>(
                <tr key={student.id} >
                  <td>{student.id}</td>
                  <td>{student.profile.firstName} {student.profile.lastName}</td>
                  <td>{gradeLevelMap[student.profile.gradeLevel]}</td>
                  
                </tr>
                ))}

              </tbody>
            </Table>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
