import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import NextNavbar from "./components/header/NextNavbar";
import Address from "./components/Address";
import ProductList from "./components/ProductList";
import ProductDescription from "./components/ProductDescription";
import UserCrud from "./components/UserCrud";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Router>
      <NextNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/address" element={<Address />} />
        <Route path="/products-list" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDescription />} />
        <Route path="/user-crud" element={<UserCrud />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
