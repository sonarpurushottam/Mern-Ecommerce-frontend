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
import BrandPage from "./components/BrandPage";
import ProductPage from "./components/ProductPage";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <Navbar />

      <div>
        { /* className="pt-10 lg:pt-4" Adjust the padding-top based on your Navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address" element={<Address />} />
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDescription />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/edit-profile" element={<UserProfile />} />

          <Route path="/brands/:categoryId" element={<BrandPage />} />
          <Route path="/products/:brandId" element={<ProductPage />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
