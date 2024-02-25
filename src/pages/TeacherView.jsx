import { TeacherSideBar } from "../components/teacherComponents/TeacherSideBar";
import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../components/adminComponents/dashboard/DashBoardPage";
import { ClassPage } from "../components/teacherComponents/class/ClassPage";
import { QuizPage } from "../components/teacherComponents/Quiz/QuizPage";

export function TeacherView() {
  return (
    <div>
      <section className="QuizDash">
        <div className="row m-0">
          {" "}
          {/* Remove margin with 'm-0' class */}
          <div className="col-lg-3 g-0">
            {" "}
            {/* Hide SideNav on small screens */}
            <TeacherSideBar />
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
