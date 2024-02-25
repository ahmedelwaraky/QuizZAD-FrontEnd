import "../../assets/css/authentication.css";
import Logo from "../../assets/images/logo.png";
import Exam from "../../assets/images/Exams-bro.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Contex/AuthContex";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
   const [ Loading  , setLoading ] =useState(false)

  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    let redirectPath = "";
    if (auth.user) {
      if (auth.user.status === "ACTIVE") {
        redirectPath = location.state?.from || "/dashboard";
      } else if (auth.user.status === "PENDING") {
        redirectPath = location.state?.from || "/pending";
      }

      navigate(redirectPath, { replace: true });
    }
  }, [auth.user, navigate, location.state]);

  const validationLoginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  async function loginSubmit(values) {
    setLoading(true)
    if (isSubmitting === false) {
      setIsSubmitting(true);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        values,
        {
          withCredentials: true,
        },
      );

      const userStatus = response.data.user.status;
      const messageText = response.data.message;

      setMessage(messageText);
      console.log(message);
      auth.login(response.data.user);
      setLoading(false)

      let redirectPath = "";
      if (userStatus === "ACTIVE") {
        redirectPath = location.state?.from || "/dashboard";
      } else if (userStatus === "PENDING") {
        redirectPath = location.state?.from || "/pending";
      }
      toast.success('Login done successfully!', {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
      setTimeout(() => navigate(redirectPath, { replace: true }), 2000);
    } catch (error) {
    
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setMessage(errorMessage);
      toast.error(errorMessage, {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
      setLoading(false)

    }

    setTimeout(() => setIsSubmitting(false), 2000);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div>
      <section className="login">
        <div className="exam">
          <img src={Exam} className="" alt="" />
        </div>
        <div className="container">
          <form
            onSubmit={formik.handleSubmit}
            className="form bg-light rounded-5 px-5 py-4"
          >
            <NavLink to='/'>
            <div className="formLogo">
              <img src={Logo} className="w-100" alt="" />
            </div>         
            </NavLink>
            <div className="row">
              <div className="email my-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  className="form-control rounded-5"
                  id="email"
                  placeholder=""
                />
                {formik.errors.email && formik.touched.email && (
                  <p className=" mt-2 p-2 text-danger">{formik.errors.email}</p>
                )}
              </div>
              <div className="password my-2">
                <label htmlFor="password" className="form-label">
                  Password
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
                  <p className=" mt-2 p-2 text-danger">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="my-2 haventAccount d-flex justify-content-between">
              <span>
                You do not have an account?{" "}
                <Link className="text-dark" to={"/register"}>
                  Sign up
                </Link>
              </span>
              <span>
                <Link className="text-dark" to={"/forgetpassword"}>
                  Forget your password{" "}
                </Link>
              </span>
            </div>
            <div className="formBtn col-4 text-center m-auto mt-3 rounded-4">
                        {Loading === true ? (
                        <button className="btn w-100 py-2 text-white fs-bold">
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        </button>
                        ) : (
                        <button type="submit" className="btn w-100 py-2 text-white fs-bold">
                            Login
                        </button>
                        )}
                    </div>
          </form>
        </div>
      </section>
    </div>
  );
}
