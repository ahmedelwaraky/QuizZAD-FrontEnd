import "../../assets/css/authentication.css";
import Logo from "../../assets/images/logo.png";
import Exam from "../../assets/images/Exams-bro.png";

export default function Otp() {
  return (
    <>
      <section className="otp">
        <div className="exam">
          <img src={Exam} className="" alt="" />
        </div>
        <div className="container d-flex">
          <form className="form bg-light rounded-5 px-5 py-4">
            <div className="formLogo">
              <img src={Logo} className="w-100" alt="" />
            </div>
            <div className="formHeader text-center py-3">
              <h1 className="h4">Check your OTP code via email</h1>
            </div>
            <div className="row  mx-auto text-center">
              <div className="checkbox my-4 d-flex col-md-12 mx-auto">
                <input
                  className="form-control"
                  type="text"
                  id="otp-input"
                  placeholder=""
                />
                <input
                  className="form-control"
                  type="text"
                  id="otp-input"
                  placeholder=""
                />
                <input
                  className="form-control"
                  type="text"
                  id="otp-input"
                  placeholder=""
                />
                <input
                  className="form-control"
                  type="text"
                  id="otp-input"
                  placeholder=""
                />
                <input
                  className="form-control"
                  type="text"
                  id="otp-input"
                  placeholder=""
                />
                {/* <button className="btn btn-outline-dark" type="submit">Verify</button> */}
              </div>
              <div className="mt-1 mb-4">
                <span>
                  Did not receive OTP ?{" "}
                  <a className="text-dark">resend OTP again</a>
                </span>
              </div>
            </div>
            <div className="formBtn col-4 text-center m-auto mt-3 rounded-4 ">
              <button
                type="submit"
                className="btn w-100 py-2 text-white fs-bold"
              >
                Sunbmit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
