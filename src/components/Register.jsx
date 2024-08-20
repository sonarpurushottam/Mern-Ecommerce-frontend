import { useState } from "react";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa";
// import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserRegister from "../hooks/useRegister";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { mutate, isLoading } = useUserRegister();

  const validationSchema = Yup.object({
    username: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number. Must be 10 digits")
      .required("Mobile number is required"),
    profilePic: Yup.mixed().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      mobile: "",
      profilePic: null,
      showPassword: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("mobile", values.mobile);

      if (values.profilePic) {
        formData.append("profilePic", values.profilePic);
      }

      mutate(formData, {
        onSuccess: () => {
          // toast.success(data.message || "Registration successful!");
          formik.resetForm();
          setPreview(null);
          navigate("/login");
        },
        onError: () => {
          // toast.error(error.response?.data?.message || "Registration failed");
        },
      });
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("profilePic", file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* <Toaster /> */}
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-blue-500 text-white flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-base md:text-lg mb-6">
            Enter your personal details and start your journey with us.
          </p>
          <NavLink to="/login">
            <button className="px-4 py-2 md:px-6 md:py-2 text-blue-500 bg-white rounded-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
              Login
            </button>
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 md:p-6 lg:p-8">
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800">
            Create Account
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 md:space-y-6"
          >
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">
                Profile Picture
              </label>
              <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gray-200 border-2 border-dashed border-gray-300 rounded-full overflow-hidden">
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                    <FaUpload className="text-xl md:text-2xl" />
                  </div>
                )}
              </div>
            </div>

            {/*  Full Name Field */}
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your Full Name"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`shadow-sm border ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md w-full py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`shadow-sm border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md w-full py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
            {/* Mobile Field */}
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`shadow-sm border ${
                  formik.touched.mobile && formik.errors.mobile
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md w-full py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.mobile}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={formik.values.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`shadow-sm border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md w-full py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue(
                      "showPassword",
                      !formik.values.showPassword
                    )
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
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
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full transition duration-150 ease-in-out ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-3 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8l4 4-4 4V4a8 8 0 010 16v-8l-4-4-4 4z"
                      ></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
