import "../../../assets/css/quiz.css";
import vector from "../../../assets/images/admin.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../Contex/UserContext";
import { useContext, useEffect } from "react";

export function QuizNav() {
  const { fetchUserProfile , myUser ,imageURL} = useContext( UserContext )

  useEffect(() => {
    fetchUserProfile();
  }, []);
 
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg rounded-4 m-2">
        <div className="container">
          <h1 className="navbar-brand text-light fs-4 px-4 fw-bold">Quiz</h1>
          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars-staggered text-light"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto">
              {  myUser?.role == 'ADMIN' && <li className="mx-2">
                <NavLink
                  className="nav-link QuizNavBtn fs-6 text-center"
                  activeclassname="active"
                  to="./all"
                >
                  All Quizzes
                </NavLink>
              </li>}
              <li className="mx-2">
                <NavLink
                  className="nav-link QuizNavBtn fs-6 text-center"
                  activeclassname="active"
                  to="./"
                >
                  Public Quizzes
                </NavLink>
              </li>
              <li className="mx-2">
                <NavLink
                  className="nav-link QuizNavBtn fs-6 text-center"
                  activeclassname="active"
                  to="./myquiz"
                >
                  My Quizzes
                </NavLink>
              </li>
              {myUser?.role != "STUDENT" &&
                <li className="mx-2">
                  <NavLink
                    className="nav-link QuizNavBtn fs-6 text-center"
                    activeclassname="active"
                    to="./0/edit"
                  >
                    New Quiz
                  </NavLink>
                </li>
              }
            </ul>
            <NavLink className="nav-link ms-auto" to="/dashboard/profile">
            <div className="p-1 ms-auto">
              <img className="adminVector rounded-circle" src={imageURL || vector}></img>
            </div>
          </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
