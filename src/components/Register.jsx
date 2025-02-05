import { useState } from "react";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa";
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
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    mobile: Yup.string().matches(/^[0-9]{10}$/, "Invalid mobile number. Must be 10 digits").required("Mobile number is required"),
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
          formik.resetForm();
          setPreview(null);
          navigate("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Create an Account</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <label className="text-gray-400 text-lg font-medium mb-2">Profile Picture</label>
            <div className="relative w-24 h-24 bg-gray-700 border-2 border-gray-600 rounded-full flex items-center justify-center overflow-hidden hover:scale-105 transition">
              <input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-full" />
              ) : (
                <FaUpload className="text-gray-400 text-2xl" />
              )}
            </div>
          </div>

          {/* Form Fields */}
          {[
            { label: "Full Name", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile", name: "mobile", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="text-gray-400 text-lg font-medium">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition"
              />
            </div>
          ))}

          {/* Password Field */}
          <div>
            <label className="text-gray-400 text-lg font-medium">Password</label>
            <div className="relative">
              <input
                type={formik.values.showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition"
              />
              <button
                type="button"
                onClick={() => formik.setFieldValue("showPassword", !formik.values.showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {formik.values.showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">Already have an account? <NavLink to="/login" className="text-blue-400 hover:underline">Login</NavLink></p>
        </div>
      </div>
    </div>
  );
};

export default Register;