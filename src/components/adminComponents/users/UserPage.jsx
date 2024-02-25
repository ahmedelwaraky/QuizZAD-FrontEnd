import { Col } from "react-bootstrap";
import AdminTable from "./AdminTable";
import TeacherTable from "./TeacherTable";
import StudentTable from "./StudentTable";
import { Route, Routes } from "react-router";
import UserNav from "./UserNav";
function UserPage() {
  return (
    <>
      <Col>
        <UserNav />
        <Routes>
          <Route path="/" element={<AdminTable />} />
          <Route path="/teacher" element={<TeacherTable />} />
          <Route path="/student" element={<StudentTable />} />
        </Routes>
      </Col>
    </>
  );
}

export default UserPage;
