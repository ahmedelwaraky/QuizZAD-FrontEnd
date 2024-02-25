import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import sideVector from "../../assets/images/Settings-bro.svg";
import "../../assets/css/layout.css"; // Import your custom CSS
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Contex/UserContext";
import { useAuth } from "../../Contex/AuthContex";
import toast from "react-hot-toast";

export default function SideBar() {
  const { myUser } = useContext(UserContext);
  const auth = useAuth();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        toast.success('Good bye , see you soon', {
          style: {
            border: '1px solid #53057B',
            padding: '16px',
            color: '#53057B',
          },
          iconTheme: {
            primary: '#53057B',
            secondary: '#FFFAEE',
          },
        });
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {isMobile ? (
        <nav className="navbar navbar-expand-lg mainBar">
          <div className="container-fluid">
            <NavLink className="nav-link mx-3" to="">
              <img className="ZADlogo" src={logo} alt="quizZAD" />
              <span className="mx-3 align-items-center fw-bold fs-4 text-light">
                QuizZAD
              </span>
            </NavLink>
            <button
              className="navbar-toggler mx-3 text-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars-staggered fs-3"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav m-auto ">
                <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 QuizNavBtn fs-6 text-center "
                    to="/dashboard/"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 QuizNavBtn fs-6 text-center "
                    to="/dashboard/class"
                  >
                    Class
                  </NavLink>
                </li>
                <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 QuizNavBtn fs-6 text-center "
                    to="/dashboard/quiz"
                  >
                    Quiz
                  </NavLink>
                </li>
                { myUser?.role == "ADMIN" && <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 QuizNavBtn fs-6 text-center "
                    to="/dashboard/user"
                  >
                    User
                  </NavLink>
                </li>}
                <li className="m-2">
                  <NavLink
                    className="nav-link rounded-5 QuizNavBtn fs-6 text-center "
                    to="/login"      
                    onClick={handleLogout}

                  >
                    Log Out
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        // Render the sidebar for larger screens here
        <nav className="navbar align-items-start sidebar accordion my-3 ms-3">
          <div className="container-fluid d-flex flex-column pt-2">
            <a
              className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
              href="#"
            >
              <div className="sidebar-brand-icon">
                <img className="ZADlogo" src={logo} alt="quizZAD" />
              </div>
              <div className="sidebar-brand-text mx-2">
                <span className="text-light fw-bold fs-4">QuizZAD</span>
              </div>
            </a>
            <ul
              className="navbar-nav text-light pt-4 reverse-color-on-hover"
              id="accordionSidebar"
            >
              <li className="nav-item my-1 SBphase">
                <NavLink className="nav-link rounded-5 p-2 px-4 " to="/dashboard/">
                  <i className="fa fa-light fa-house-user fs-4 " />
                  <span className="fs-6 ps-4 textSB">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item my-2 SBphase">
                <NavLink
                  className="nav-link rounded-5 p-2 px-4 "
                  to="/dashboard/class"
                >
                  <i className="fa fa-solid fa-landmark fs-4 " />
                  <span className="fs-6 ps-4 textSB">Class</span>
                </NavLink>
              </li>
              <li className="nav-item my-2 SBphase">
                <NavLink
                  className="nav-link rounded-5 p-2 px-4 "
                  to="/dashboard/quiz"
                >
                  <i className="fa-solid fa-book fs-4 " />
                  <span className="fs-6 ps-4 textSB">Quiz</span>
                </NavLink>
              </li>
              {myUser?.role == "ADMIN" ? (
                <li className="nav-item my-2 SBphase">
                  <NavLink
                    className="nav-link rounded-5 p-2 px-4 "
                    to="/dashboard/user"
                  >
                    <i className="fa fa-solid fa-user fs-4 " />
                    <span className="fs-6 ps-4 textSB">User</span>
                  </NavLink>
                </li>
              ) : null}

              <div className="sidebar-brand-icon m-auto">
                <img className="barVector" src={sideVector} alt="quizZAD" />
              </div>
              <li className="nav-item my-2 SBphase">
                <button
                  className="nav-link rounded-5 p-2 px-4 "
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-door-open fs-4 " />
                  <span className="fs-6 ps-4 textSB">Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}
