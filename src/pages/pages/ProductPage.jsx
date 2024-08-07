import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductPage = () => {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/brand/${brandId}`
        );
        setProducts(data);
      } catch (error) {
        toast.error("Failed to fetch products");
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [brandId]);

  const isLoggedIn = () => !!localStorage.getItem("token");

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to cart");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/wishlist",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Product added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Error adding to wishlist");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.productImage[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
            <div className="p-4 flex justify-between items-center">
              <button
                onClick={() => handleAddToCart(product._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToWishlist(product._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Add to Wishlist
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
