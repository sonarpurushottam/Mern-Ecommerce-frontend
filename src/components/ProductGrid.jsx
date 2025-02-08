import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAddToCart, useAddToWishlist } from "../hooks/useCartWishlist";

const ProductGrid = ({ products }) => {
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-8 bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-100 tracking-wider">Explore the Future of Shopping</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="relative bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col items-center transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={`/product/${product._id}`} className="w-full flex flex-col items-center">
              <div className="relative w-full h-64 flex items-center justify-center bg-gray-900 rounded-xl mb-4 overflow-hidden shadow-lg">
                <motion.img
                  src={product.productImage[0]}
                  alt={product.name}
                  className="w-4/5 h-4/5 object-contain transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-3"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2 text-center tracking-wide">
                {product.name}
              </h3>
              <p className="text-blue-400 text-2xl font-bold">
                ₹{product.price}
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 ml-2 line-through">₹{product.originalPrice}</span>
                )}
              </p>
            </Link>
            <div className="absolute top-4 right-4">
              <motion.button
                onClick={() => addToWishlist(product._id)}
                className="p-3 bg-gray-700 rounded-full shadow-md hover:bg-red-500 transition-all"
                aria-label="Add to Wishlist"
                whileHover={{ scale: 1.1 }}
              >
                <FaRegHeart className="text-white" />
              </motion.button>
            </div>
            <motion.button
              onClick={() => addToCart(product._id)}
              className="mt-6 w-full bg-blue-500 text-white py-4 rounded-xl flex items-center justify-center hover:bg-blue-600 focus:outline-none relative overflow-hidden"
              aria-label="Add to Cart"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart className="mr-2 text-lg" />
              <span className="text-lg font-semibold">Add to Cart</span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
