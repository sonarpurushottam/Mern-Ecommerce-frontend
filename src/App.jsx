import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Address from "./components/Address";
import ProductList from "./components/ProductList";
import ProductDescription from "./components/ProductDescription";
import UserCrud from "./components/UserCrud";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";
import DemoComp from "./components/DemoComp";
import BrandSlider from "./components/BrandSlider";
import HomePage from "./pages/pages/HomePage";
import BrandPage from "./pages/pages/BrandPage";
import ProductPage from "./pages/pages/ProductPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <HomePage />
      <div className="pt-10 lg:pt-4">
        {" "}
        {/* Adjust the padding-top based on your Navbar height */}
        {/* <Routes>
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
          <Route path="/demo" element={<DemoComp />} />
          <Route path="/brands/:categoryId" element={<BrandSlider />} />
        </Routes> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands/:categoryId" element={<BrandPage />} />
          <Route path="/products/:brandId" element={<ProductPage />} />
          {/* Define other routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
