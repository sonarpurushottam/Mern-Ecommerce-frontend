/* eslint-disable react/prop-types */
"use client";
import { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import { NavLink, useNavigate } from "react-router-dom";
import Category from "./Category";
import { useLogoutUser } from "../hooks/useUser";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { FaCartShopping } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const { isLoggedIn, logout } = useAuth(); // Use the auth context
  const navigate = useNavigate();

  // Fetch function to get the user profile
  const fetchUserProfile = async () => {
    const { data } = await axiosInstance.get("/users/profile");
    return data;
  };

  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: isLoggedIn, // Only fetch when logged in
    onError: () => toast.error("Failed to fetch user profile"),
  });

  // Fetch function to get the cart item count
  const fetchCartItemCount = async () => {
    const { data } = await axiosInstance.get("/cart/item-count");
    return data.itemCount;
  };

  // Fetch function to get the wishlist count
  const fetchWishlistCount = async () => {
    const { data } = await axiosInstance.get("/wishlist/count");
    return data.count;
  };

  // Using React Query to fetch cart item count
  const { data: cartItemCount = 0, isLoading: isLoadingCart } = useQuery({
    queryKey: ["cartItemCount"],
    queryFn: fetchCartItemCount,
    enabled: isLoggedIn, // Only fetch when logged in
    refetchInterval: 1000, // Polling interval of 1 second
    onError: () => toast.error("Failed to fetch cart item count"),
  });

  // Using React Query to fetch wishlist count
  const { data: wishlistCount = 0, isLoading: isLoadingWishlist } = useQuery({
    queryKey: ["wishlistCount"],
    queryFn: fetchWishlistCount,
    enabled: isLoggedIn, // Only fetch when logged in
    refetchInterval: 1000, // Polling interval of 1 second
    onError: () => toast.error("Failed to fetch wishlist count"),
  });

  const mutation = useLogoutUser();

  const handleLogout = async () => {
    try {
      await mutation.mutateAsync(); // Call the mutation
      logout(); // Use the auth context to handle logout
      navigate("/login"); // Redirect to login page
      toast.success("Logged out successfully!"); // Show success message
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again."); // Show error message
    }
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <NavLink to="/">
          <MenuItem item="Home" />
        </NavLink>
        <MenuItem setActive={setActive} active={active} item="Categories ">
          <div>
            <Category />
          </div>
        </MenuItem>
        {!isLoggedIn ? (
          <NavLink to="/login">
            <MenuItem item="Login" />
          </NavLink>
        ) : (
          <>
            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-4 text-sm text-cyan-600">
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
                <NavLink to="/edit-profile">Edit Profile</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/address">Manage Address</NavLink>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </MenuItem>

            <Tooltip content="View Wishlist" placement="bottom" color="primary">
              <NavLink
                to="/wishlist"
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center group ml-2 mr-2"
              >
                <MdFavorite />
                {!isLoadingWishlist && wishlistCount > 0 && (
                  <span>{wishlistCount}</span>
                )}
              </NavLink>
            </Tooltip>

            <Tooltip content="View Cart" placement="bottom" color="primary">
              <NavLink
                to="/cart"
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center group ml-2 mr-2"
              >
                {!isLoadingCart && cartItemCount > 0 && (
                  <span>{cartItemCount}</span>
                )}
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </NavLink>
            </Tooltip>

            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user ? user.username : "User"}
              size="sm"
              src={user?.profilePic}
            />
          </>
        )}
      </Menu>
    </div>
  );
}
