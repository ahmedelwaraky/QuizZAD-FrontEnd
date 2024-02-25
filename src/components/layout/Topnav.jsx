import vector from "../../assets/images/teacher.png";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contex/UserContext";
import { userRoleMap } from "../../controls/gradeLevel";

export default function Topnav() {
  const { fetchUserProfile , myUser ,imageURL} = useContext( UserContext )

  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <div>
      <div className="container ">
        <div className="hstack gap-3 bg-lihgt">
          <h1 className="navbar-brand text-light fs-4 px-4 fw-bold text-dark">
            {userRoleMap[myUser.role]}
          </h1>
          <NavLink className="nav-link ms-auto" to="/dashboard/profile">
            <div className="p-2 ms-auto">
              <img className="adminVector rounded-circle" src={imageURL || vector}></img>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
