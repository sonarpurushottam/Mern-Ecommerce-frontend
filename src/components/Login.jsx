import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isLoading } = useLogin();

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
            if (data.token) {
              localStorage.setItem("token", data.token);
              navigate(redirectTo);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);

  const handleDemoLogin = () => {
    formik.setValues({
      emailOrMobile: "user@gmail.com",
      password: "user1234",
      showPassword: false,
    });
    formik.submitForm();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <Toaster />
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-indigo-400">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="emailOrMobile"
              className="block text-sm font-medium"
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
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
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
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue(
                    "showPassword",
                    !formik.values.showPassword
                  )
                }
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                aria-label={
                  formik.values.showPassword ? "Hide password" : "Show password"
                }
              >
                {formik.values.showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md transition duration-300 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-indigo-300">Try the demo account</p>
          <button
            onClick={handleDemoLogin}
            className="text-indigo-400 hover:underline"
          >
            Login as ➡️ Demo User
          </button>
        </div>
        <div className="text-center mt-4">
          <NavLink to="/register" className="text-indigo-400 hover:underline">
            Don't have an account? Register
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
