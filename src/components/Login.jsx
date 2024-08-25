import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isLoading } = useLogin();

  // Extract the redirectTo from the location state or default to home
  const redirectTo = location.state?.redirectTo || "/";

  const validationSchema = Yup.object({
    emailOrMobile: Yup.string().required("Email or Mobile is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      emailOrMobile: "",
      password: "",
      showPassword: false,
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        { emailOrMobile: values.emailOrMobile, password: values.password },
        {
          onSuccess: (data) => {
            // Assuming the token is returned in data.token
            if (data.token) {
              localStorage.setItem("token", data.token); // Store the token
              navigate(redirectTo); // Redirect after successful login
            }
          },
          onError: (error) => {
            toast.error(
              error?.response?.data?.message ||
                "Login failed. Please try again."
            );
          },
        }
      );
    },
  });

  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(redirectTo); // If logged in, redirect to the desired page
    }
  }, [navigate, redirectTo]);

  const handleDemoLogin = () => {
    formik.setValues({
      emailOrMobile: "demo@gmail.com", // Set default email for demo viewer
      password: "demo1234", // Set default password for demo viewer
      showPassword: false,
    });
    formik.handleSubmit(); // Automatically submit the form
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Toaster />
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="emailOrMobile"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Mobile
            </label>
            <input
              type="text"
              id="emailOrMobile"
              name="emailOrMobile"
              placeholder="Enter your email or mobile"
              value={formik.values.emailOrMobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.emailOrMobile && formik.errors.emailOrMobile
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.emailOrMobile && formik.errors.emailOrMobile && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.emailOrMobile}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={formik.values.showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue(
                    "showPassword",
                    !formik.values.showPassword
                  )
                }
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {formik.values.showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleDemoLogin}
            className="text-indigo-600 hover:underline"
          >
            Login as Demo Viewer
          </button>
        </div>
        <div className="text-center mt-4">
          <NavLink to="/register" className="text-indigo-600">
            Don't have an account? Register
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
