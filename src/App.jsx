import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Address from "./components/Address";
import ProductList from "./components/ProductList";
import ProductDescription from "./components/ProductDescription";

import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";
import DemoComp from "./components/DemoComp";

import BrandPage from "./components/BrandPage";
import ProductPage from "./components/ProductPage";
import Order from "./components/Order";

const App = () => {
  return (
    <Router>
      <Navbar />

      <div className="pt-10 lg:pt-4">
        {" "}
        {/* Adjust the padding-top based on your Navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address" element={<Address />} />
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDescription />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/demo" element={<DemoComp />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/brands/:categoryId" element={<BrandPage />} />
          <Route path="/products/:brandId" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
