import "../../assets/css/authentication.css";
import Logo from "../../assets/images/logo.png";
import Exam from "../../assets/images/Exams-bro.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contex/AuthContex";
import axios from "axios";
import toast from "react-hot-toast";

export default function PendingPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout route
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        null,
        {
          withCredentials: true,
        },
      );
      auth.logout();
      if (response.status === 200) {
        navigate("/login");
        toast.success('Good bye , see you soon', {
          style: {
          backgroundColor:'#53057B',
           padding: '16px',
           color: 'white',
         },
         iconTheme: {
           primary: 'white',
           secondary: '#53057B',
         },})
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div>
      <section className="pending">
        <div className="exam">
          <img src={Exam} className="" alt="" />
        </div>
        <div className="container">
          <div className="form bg-light text-center rounded-5 py-4">
            <div className="formLogo">
              <img src={Logo} className="w-100" alt="" />
            </div>
            <div className="pending-header my-5">
              <h1 className="h4">Successfull account registration </h1>
            </div>
            <div className="pending-description pb-2">
              <p>
                your account is pending , Our admin will
                <br />
                approve your account as soon as possible.
                <br />
                thank you
              </p>
            </div>
            <div className="formBtn col-4 text-center m-auto mt-3 rounded-4 ">
              <button
                type="submit"
                className="btn w-100 py-2 text-white fs-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
