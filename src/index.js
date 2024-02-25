import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.json";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContextProvider } from "./Contex/UserContext.jsx";
import { TeacherUsersContexProvider } from "./Contex/TeacherUsersContex.jsx";
import { StudentUsersContexProvider } from "./Contex/StudentUsersContex.jsx";
import { ClassProvider } from "./Contex/ClassContex.jsx";
import { QuizProvider } from "./Contex/QuizContext.jsx";
import { AuthProvider } from "./Contex/AuthContex";
import { TakingQuizProvider } from "./Contex/TakingQuizContext.jsx";
import { Toaster } from "react-hot-toast";
import { QuestionContextProvider } from "./Contex/QuestionContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <TakingQuizProvider>
      <ClassProvider>
        <TeacherUsersContexProvider>
          <StudentUsersContexProvider>
            <QuizProvider>
              <UserContextProvider>
                <QuestionContextProvider>

              <Toaster
                position="top-right"
                reverseOrder={false}
              />
                <App />
                </QuestionContextProvider>
             </UserContextProvider>
            </QuizProvider>
          </StudentUsersContexProvider>
        </TeacherUsersContexProvider>
      </ClassProvider>
    </TakingQuizProvider>
  </AuthProvider>
);
