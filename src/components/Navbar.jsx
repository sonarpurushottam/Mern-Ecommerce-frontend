import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "../constants/index";
import {
  FaTimes,
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import logo from "../assets/Iphone/Iphone1.png";
import { useLogoutUser } from "../hooks/useUser"; // Import the custom hook
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null); // Create a ref for the profile dropdown
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const mutation = useLogoutUser(); // Use the custom hook

  const handleLogout = async () => {
    try {
      await mutation.mutateAsync(); // Call the mutation
      localStorage.removeItem("token"); // Remove token from local storage
      navigate("/login"); // Redirect to login page
      toast.success("Logged out successfully!"); // Show success message
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again."); // Show error message
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-lg">
        <div className="flex items-center justify-between p-1 lg:w-[80rem] mx-auto">
          <img src={logo} alt="logo" width={80} height={22} />
          <div className="hidden lg:flex space-x-6 items-center">
            {menuItems.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={`text-sm ${
                  index !== 0 ? "border-l-2 border-neutral-300/20 pl-2" : ""
                } hover:opacity-50`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-lg border border-neutral-300"
              />
            </div>
            <FaSearch className="cursor-pointer text-xl" />
            <NavLink to="/wishlist">
              <FaHeart className="cursor-pointer text-xl" />
            </NavLink>
            <NavLink to="/cart">
              <FaShoppingCart className="cursor-pointer text-xl" />
            </NavLink>

            <div className="relative" ref={profileDropdownRef}>
              <FaUser
                className="cursor-pointer text-xl"
                onClick={toggleProfileDropdown}
              />
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                  <NavLink
                    to="/user-profile"
                    className="block px-4 py-2 hover:bg-neutral-100"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/order/:id"
                    className="block px-4 py-2 hover:bg-neutral-100"
                  >
                    Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-neutral-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button className="lg:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="w-full bg-white shadow-lg lg:hidden">
            {menuItems.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="block p-4 uppercase tracking-tighter"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      {/* Adding a spacer to ensure the content does not overlap with the fixed Navbar */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default Navbar;
