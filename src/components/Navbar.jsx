import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import { useLogoutUser } from "../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { FaCartShopping } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";

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

// Fetch function to get the user profile
const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get("/users/profile");
  return data;
};

export default function NextNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") // Check if token exists
  );

  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },

    // { name: "Products", path: "/products-list" },
  ];

  // Using React Query with object syntax to fetch cart item count
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

  // Using React Query to fetch user profile
  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: isLoggedIn, // Only fetch when logged in
    onError: () => toast.error("Failed to fetch user profile"),
  });

  const mutation = useLogoutUser();
  const handleLogout = async () => {
    try {
      await mutation.mutateAsync(); // Call the mutation
      localStorage.removeItem("token"); // Remove token from local storage
      setIsLoggedIn(false); // Update login state
      navigate("/login"); // Redirect to login page
      toast.success("Logged out successfully!"); // Show success message
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again."); // Show error message
    }
  };

  const onEditProfile = () => {
    navigate("/edit-profile");
  };
  const onOrder = () => {
    navigate("/orders");
  };
  const onAddress = () => {
    navigate("/address");
  };

  return (
    <Navbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">Store</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          {menuItems.slice(0, 9).map((item) => (
            <NavbarItem key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-secondary" : "text-foreground"
                }
              >
                {item.name}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>

      {isLoggedIn && (
        <NavbarContent as="div" className="items-center" justify="end">
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
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user ? user.username : "User"}
                size="sm"
                src={
                  user?.profilePic ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">
                  {user ? user.email : "Loading..."}
                </p>
              </DropdownItem>
              <DropdownItem key="edit-profile" onClick={onEditProfile}>
                <p className="font-semibold">Edit Profile</p>
              </DropdownItem>
              <DropdownItem key="order" onClick={onOrder}>
                <p className="font-semibold">Order History</p>
              </DropdownItem>
              <DropdownItem key="address" onClick={onAddress}>
                <p className="font-semibold">Manage Address</p>
              </DropdownItem>
            
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-primary"
                  : index === menuItems.length - 1
                  ? "text-danger"
                  : "text-foreground"
              }
              size="lg"
            >
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
