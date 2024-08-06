/* eslint-disable react/no-unescaped-entities */
// src/components/Login.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin();

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
          onSuccess: () => {
            navigate("/");
          },
        }
      );
    },
  });

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
          {/* Email or Mobile Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </motion.button>
          </div>
          <div>
            <p>Don't have an account</p>
            <NavLink to="/register">
              <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Register
              </button>
            </NavLink>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
