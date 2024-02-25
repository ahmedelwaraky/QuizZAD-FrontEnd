import { useContext } from "react";
import "../../assets/css/Dashboard.css";
import vector from "../../assets/images/vector.png";
import { UserContext } from "../../Contex/UserContext";
import { userRoleMap } from "../../controls/gradeLevel";

export default function WelcomeSide() {
  const { myUser } = useContext(UserContext);

  return (
    <div>
      <div id="welcome" className="text-white">
        <div className="container">
          <div className="d-flex weclome rounded-5">
            <div className="col-md-6">
              <div className="mt-5 py-3 ps-4">
                <h3 className="mb-1">Welcome back , {myUser.firstName}</h3>
                <p className="">Always stay update in your {userRoleMap[myUser.role]} portal</p>
              </div>
            </div>
            <div className="py-3 ms-5">
              <div className="vector">
                <img src={vector}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
