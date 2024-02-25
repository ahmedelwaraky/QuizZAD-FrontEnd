import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../components/adminComponents/dashboard/DashBoardPage";
import { StudentSideBar } from "../components/studentComponents/StudentSideBar";
import { QuizPage } from "../components/studentComponents/Quiz/QuizPage";
import { ClassPage } from "../components/studentComponents/class/ClassPage";

export default function StudentView() {
  return (
    <div>
      <section className="QuizDash">
        <div className="row m-0">
          {" "}
          {/* Remove margin with 'm-0' class */}
          <div className="col-lg-3 g-0">
            {" "}
            {/* Hide SideNav on small screens */}
            <StudentSideBar />
          </div>
          <div className="col-lg-9 pt-2">
            <Routes>
              <Route path="" element={<DashBoardPage />} />
              <Route path="class/*" element={<ClassPage />} />
              <Route path="quiz/*" element={<QuizPage />} />
            </Routes>
          </div>
        </div>
      </section>
    </div>
  );
}
