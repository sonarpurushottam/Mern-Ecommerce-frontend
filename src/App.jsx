import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Address from "./components/Address";
import ProductList from "./components/ProductList";
import ProductDescription from "./components/ProductDescription";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import BrandPage from "./components/BrandPage";
import ProductPage from "./components/ProductPage";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";
import Checkout from "./pages/Checkout";
import { NavbarDemo } from "./components/NavbarDemo";
import Category from "./components/Category";

const App = () => {
  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-[#1a1c1e] text-white">
        <NavbarDemo />

        <main className="flex-grow container mx-auto px-4 py-6 mt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/address" element={<Address />} />
              <Route path="/category" element={<Category />} />
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
          </AnimatePresence>
        </main>

        {/* <footer className="text-center py-4 bg-[#131517] text-gray-400 text-sm">
          © {new Date().getFullYear()} Futuristic Store. All Rights Reserved.
        </footer> */}
      </div>
    </Router>
  );
};

export default App;
