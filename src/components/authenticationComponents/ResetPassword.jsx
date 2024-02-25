import "../../assets/css/authentication.css";
import Logo from "../../assets/images/logo.png";
import Exam from "../../assets/images/Exams-bro.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

export default function ResetPassword() {
  const navigate = useNavigate();

  // Get the token from the URL
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  // Token
  const resetToken = Cookies.get("jwt-reset");
  console.log("Token:", token);
  console.log("All Cookies:", Cookies.get());
  if (resetToken) {
    // You have the resetToken, and you can use it as needed
    // console.log('resetToken:',resetToken);
  } else {
    console.log("resetToken not found in the cookie.");
  }

  let validationLoginSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be at most 15 characters"),
  });

  async function resetPasswordForm(values) {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/auth/resetpassword/${token}`,
        values,
        {
          withCredentials: true,
        },
      );
      console.log(values);
      if (response.data.message === "Password reset successfully") {
        navigate("/login"); // Navigate to the login page
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: resetPasswordForm,
  });

  return (
    <div>
      <section className="reset-password">
        <div className="exam">
          <img src={Exam} className="" alt="" />
        </div>
        <div className="container">
          <form
            onSubmit={formik.handleSubmit}
            className="form bg-light rounded-5 px-5 py-4"
          >
            <div className="formLogo">
              <img src={Logo} className="w-100" alt="" />
            </div>
            <div className="formHeader text-center pt-3 mb-3">
              <h1>Reset Password</h1>
            </div>
            <div className="row">
              <div className="password my-2">
                <label htmlFor="password" className="form-label">
                  New password
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  className="form-control rounded-5"
                  id="password"
                  placeholder=""
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="alert mt-2 p-2 alert-danger">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="my-2 haventAccount">
              <span>
                If you don&rsquo;t receive a password reset email,{" "}
                <Link className="text-dark" to={"/dd"}>
                  click here
                </Link>
              </span>
            </div>
            <div className="formBtn col-4 text-center m-auto mt-3 rounded-4">
              <button
                type="submit"
                className="btn w-100 py-2 text-white fs-bold"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
