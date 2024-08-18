import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
// import { AcmeLogo } from "./AcmeLogo.jsx";
// import { SearchIcon } from "./SearchIcon.jsx";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLogoutUser } from "../hooks/useUser";
export default function NextNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
    { name: "Address", path: "/address" },
    { name: "Products", path: "/products-list" },
    { name: "Cart", path: "/cart" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "orders", path: "/orders" },
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
  const mutation = useLogoutUser();
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
  const onEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <Navbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="mr-4">
          {/* <AcmeLogo /> */}
          {/* <img src={logo} alt="logo" width={80} height={22} /> */}
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
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

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          // startContent={<SearchIcon size={18} />}
          type="search"
        />
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
              <p className="font-semibold">edit profile</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
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
