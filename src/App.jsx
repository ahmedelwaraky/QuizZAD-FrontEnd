import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notfound from "./pages/Notfound";
import Register from "./components/authenticationComponents/Register";
import Login from "./components/authenticationComponents/Login";
import Otp from "./components/authenticationComponents/Otp";
import ForgetPassword from "./components/authenticationComponents/ForgetPassword";
import ResetPassword from "./components/authenticationComponents/ResetPassword";
import PendingPage from "./components/authenticationComponents/PendingPage";
import Topnav from "./components/layout/Topnav";
import { QuizView } from "./components/adminComponents/Quiz/QuizView";
import EditProfile from "./components/profile/EditProfile";
import { View } from "./pages/View";
import ProfileView from "./components/profile/ProfileView";
import TakeQuiz from "./components/adminComponents/Quiz/TakingQuiz/TakeQuiz";
import ProtectedRoute from "./controls/ProtectedRoute";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/topnav" element={<Topnav />} />

        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route
          path="/pending"
          element={
            <ProtectedRoute>
              <PendingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/:id/takequiz" element={<TakeQuiz />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route path="/quizview/*" element={<QuizView />} />

        <Route path="/:id/:questionsId/Result" element={<Result />} />
        <Route path="/:id/Takequiz" element={<TakeQuiz />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;