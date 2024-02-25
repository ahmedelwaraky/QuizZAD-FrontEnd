import { useContext, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { TeacherUsersContex } from "../../../Contex/TeacherUsersContex";
import { StudentUsersContex } from "../../../Contex/StudentUsersContex";
import { gradeLevelMap } from "../../../controls/gradeLevel";
import { ClassContext } from "../../../Contex/ClassContex";
import toast from "react-hot-toast";
import { UserContext } from "../../../Contex/UserContext";

export function AddMembers() {
  const { myUser } = useContext(UserContext)
  const [ teachers , setTeachers ] = useState([])
  const [ students , setStudents ] = useState([])
  const { TeacherUsers , fetchTeacherData , searchTeachers} = useContext(TeacherUsersContex);
  const { StudentUsers , fetchStudentData, searchStudents} = useContext(StudentUsersContex);
  const { teacherToClass , teacherOutClass , studentToClass , studentOutClass , getClass } = useContext(ClassContext);
  const [myClass, setMyClass] = useState({});
  const { id } = useParams();
  const [teacherName , setTeacherName ] = useState({
    searchKey:''
  })
  const [studentName , setStudentName ] = useState({
    searchKey:''
  })


  const fetchData = async () => {
    try {
      const response = await getClass(id);
      setMyClass(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (myUser.role === 'ADMIN') {
      fetchData();
      fetchStudentData();
      fetchTeacherData();
      setTeachers(TeacherUsers);
      setStudents(StudentUsers);
    }
  }, []);

  const AssignTeacher = async (teacherId) => {
    try {
      await teacherToClass(id, teacherId);
      const response = await getClass(id);
      setMyClass(response.data);
      toast.success('Teacher Added successfully to class', {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },}
      
    )} catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const deleteTeacher = async (teacherId) => {
    try {
      await teacherOutClass(id, teacherId);
      const response = await getClass(id);
      setMyClass(response.data);
      toast.success('Teacher deleted successfully from class', {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const AssignStudent = async (studentId) => {
    try {
      await studentToClass(id, studentId);
      const response = await getClass(id);
      setMyClass(response.data);
      toast.success('Student Added successfully to class', {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  
  const deleteStudent = async (studentId) => {
    try {
      await studentOutClass(id, studentId);
      const response = await getClass(id);
      setMyClass(response.data);
      toast.success('Student deleted successfully from class', {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //teacher search bar 
  const getTeacherValue = (e) => {
    setTeacherName({
      ...teacherName,
      [e.target.name]: e.target.value,
  })
};

const teacherOperation = async (e) => {
  e.preventDefault();
  try {
    const response = await searchTeachers(teacherName.searchKey);
    setTeachers(response.data);
  } catch (error) {
    console.error("Error searching classes:", error);
  }
};
  
//student search bar 
const getStudentValue = (e) => {
  setStudentName({
    ...studentName,
    [e.target.name]: e.target.value,
})
};

const studentOperation = async (e) => {
e.preventDefault();
try {
  const response = await searchStudents(studentName.searchKey);
  setStudents(response.data);
  console.log(response.data);
} catch (error) {
  console.error("Error searching classes:", error);
}
};

  return (
    <div className="m-2 mt-3">
      <section className="rounded-4 py-4 bg-light Scroller">
        <div>
          <h1 className="text-center my-4">Add members</h1>
        </div>
        <Accordion defaultActiveKey="null" className="col-md-11 m-auto">
          <Accordion.Item className="my-3 rounded " eventKey="0">
            <Accordion.Header className="accordion-header text-light">
              Teacher List
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="teacher">
                    <div className="input-group row">
                      <label
                        htmlFor="className"
                        className="form-label px-3 text-center fs-3"
                      >
                        All teachers
                      </label>
                    </div>
                  </div>
                  <div>
                    <Table hover responsive className="mt-2 userTable">
                      <thead className="custom-thead">
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Specialization</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="userBodyTable">
                      <tr>
                          <td colSpan="4">
                            <div className="d-flex ">
                              <form className="d-flex" onSubmit={teacherOperation}>
                                <input
                                  className="form-control mx-2 rounded-5 col-md-8"
                                  type="text"
                                  placeholder="Search teachers by name"
                                  aria-label="Search"
                                  id="searchKey"
                                  name="searchKey"
                                  onChange={getTeacherValue}
                                  value={teacherName.searchKey}
                                />
                                <button className="rounded-5 me-auto px-2 searchBtn col-md-4" type="submit">
                                  Search
                                </button>
                              </form> 
                            </div>                        
                          </td>
                        </tr>
                        {teachers.map((teacher) => (
                          <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>
                              {teacher.profile?.firstName}{" "}
                              {teacher.profile?.lastName}
                            </td>
                            <td>{teacher.profile?.specialization}</td>
                            <td>
                              <div className="p-0 pt-1">
                                <i
                                  className="fa-solid fa-plus mx-3 fs-5 text-success border-0"
                                  onClick={() => AssignTeacher(teacher.id)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="teacher">
                    <div className="input-group row">
                      <label
                        htmlFor="className"
                        className="form-label px-3 text-center fs-3"
                      >
                        Class teachers
                      </label>
                    </div>
                  </div>
                  <Table hover responsive className="mt-2 userTable">
                    <thead className="custom-thead">
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="userBodyTable">
                      {myClass.teachers &&
                        myClass.teachers.map((teacher) => (
                          <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>
                              {teacher.profile?.firstName}{" "}
                              {teacher.profile?.lastName}
                            </td>
                            <td>{teacher.profile?.specialization}</td>
                            <td>
                              <div className="p-0 pt-1">
                                <NavLink className="fa-solid fa-trash-can mx-3 fs-5 text-danger" onClick={() => deleteTeacher(teacher.id)}/>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="my-3 rounded " eventKey="1">
            <Accordion.Header className="accordion-header text-light">
              Student List
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="students">
                    <div className="input-group row">
                      <label
                        htmlFor="className"
                        className="form-label px-3 text-center fs-3"
                      >
                        All students
                      </label>
                    </div>
                  </div>
                  <div>
                    <Table hover responsive className="mt-2 userTable">
                      <thead className="custom-thead">
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>grade Lvl</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="userBodyTable">
                        <tr>
                          <td colSpan="4">
                            <div className="d-flex ">
                              <form className="d-flex" onSubmit={studentOperation}>
                                <input
                                  className="form-control mx-2 rounded-5 col-md-8"
                                  type="text"
                                  placeholder="Search students by name"
                                  aria-label="Search"
                                  id="searchKey"
                                  name="searchKey"
                                  onChange={getStudentValue}
                                  value={studentName.searchKey}
                                />
                                <button className="rounded-5 me-auto px-2 searchBtn col-md-4" type="submit">
                                  Search
                                </button>
                              </form> 
                            </div>                        
                          </td>
                        </tr>
                        {students.map((student) => (
                          <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>
                              {student.profile?.firstName}{" "}
                              {student.profile?.lastName}
                            </td>
                            <td>{gradeLevelMap[student.profile?.gradeLevel]}</td>
                            <td>
                              <div className="p-0 pt-1">
                                <i
                                  className="fa-solid fa-plus mx-3 fs-5 text-success"
                                  onClick={() => AssignStudent(student.id)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="teacher">
                    <div className="input-group row">
                      <label
                        htmlFor="className"
                        className="form-label px-3 text-center fs-3"
                      >
                        Class students
                      </label>
                    </div>
                  </div>
                  <Table hover responsive className="mt-2 userTable">
                    <thead className="custom-thead">
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>grade Lvl</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="userBodyTable">
                      {myClass.students &&
                        myClass.students.map((student) => (
                          <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>
                              {student.profile?.firstName}{" "}
                              {student.profile?.lastName}
                            </td>
                            <td>
                              {gradeLevelMap[student.profile?.gradeLevel]}
                            </td>
                            <td>
                              <div className="p-0 pt-1">
                                <NavLink className="fa-solid fa-trash-can mx-3 fs-5 text-danger" onClick={() => deleteStudent(student.id)} />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="my-3 m-auto col-md-6">
          <NavLink
            type="submit"
            className="quizButton text-center rounded-4 p-2 fs-5"
            to={`/dashboard/class/${id}`}
          >
            <i className="fa-solid fa-arrow-left me-3" />
            Save Changes
          </NavLink>
        </div>
      </section>
    </div>
  );
}
