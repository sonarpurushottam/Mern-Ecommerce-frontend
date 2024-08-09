import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAddToCart, useAddToWishlist } from "../hooks/useCartWishlist";

const ProductGrid = ({ products }) => {
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-105"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-80">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.productImage[0]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </Link>
              <button
                onClick={() => handleAddToWishlist(product._id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                aria-label="Add to Wishlist"
              >
                <FaRegHeart className="text-red-500" />
              </button>
            </div>
            <div className="p-4 flex flex-col flex-grow text-center">
              <Link
                to={`/product/${product._id}`}
                className="flex flex-col items-center"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 ml-2 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </p>
              </Link>
            </div>
            <motion.button
              onClick={() => handleAddToCart(product._id)}
              className="bg-blue-500 text-white p-3 rounded-b-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none relative overflow-hidden"
              aria-label="Add to Cart"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart className="mr-2" />
              <span className="text-base font-semibold">Add to Cart</span>
              <span className="absolute inset-0 bg-blue-600 opacity-30 transition-transform duration-300 ease-in-out transform translate-x-full group-hover:translate-x-0"></span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
