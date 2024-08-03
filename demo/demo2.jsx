import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";

export default function NextNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Navbar visibility state
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  // Toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
    { name: "Address", path: "/address" },
    { name: "Products", path: "/products-list" },
    { name: "User Management", path: "/user-crud" }, // User Management link
    { name: "Log Out", path: "/" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // Handle scroll event to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        setIsNavbarVisible(false); // Scrolling down
      } else {
        setIsNavbarVisible(true); // Scrolling up
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      ref={navbarRef}
      className={`bg-white shadow-md fixed w-full z-10 top-0 left-0 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="block sm:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-black" /> // Close icon
            ) : (
              <FaBars className="w-6 h-6 text-black" /> // Menu (hamburger) icon
            )}
          </button>
          <div className="ml-4 flex items-center">
            <p className="hidden sm:block font-bold text-lg">ACME</p>
          </div>
        </div>

        <div className="hidden sm:flex flex-grow items-center justify-center space-x-4">
          {menuItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-lg ${isActive ? "text-primary" : "text-gray-700"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <input
              className="border rounded-md p-2 pl-10 w-full sm:w-64"
              placeholder="Type to search..."
              type="search"
            />
            <MdSearch
              className="absolute inset-y-0 left-2 flex items-center text-gray-500"
              size={18}
            />
          </div>
          <NavLink to="/wishlist" className="text-gray-700 hover:text-primary">
            <FaHeart className="w-6 h-6" />
          </NavLink>
          <NavLink to="/cart" className="text-gray-700 hover:text-primary">
            <FaShoppingCart className="w-6 h-6" />
          </NavLink>
          <NavLink to="/user-crud" className="text-gray-700 hover:text-primary">
            <FaUser className="w-6 h-6" /> {/* User icon */}
          </NavLink>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`fixed top-16 left-0 w-full bg-white shadow-md z-20 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <ul className="space-y-2 p-4">
          {menuItems.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 text-lg ${
                    isActive ? "text-primary" : "text-gray-700"
                  }`
                }
                onClick={handleLinkClick} // Hide menu on link click
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
}
