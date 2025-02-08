import useWishlist from "../hooks/useWishlist";
import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { wishlist, loading, error, handleRemoveFromWishlist } = useWishlist();

  if (loading) {
    return <div className="text-center text-gray-500">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg">Your wishlist is empty.</div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-8 text-white bg-black">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-100">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {wishlist.map((item) => {
          const product = item.productId || {};
          const productImage = product.productImage || [];
          const productName = product.name || "Unknown Product";
          const productPrice = product.price || "0";

          return (
            <motion.div
              key={item._id}
              className="relative bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-all hover:scale-105 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-full h-56 flex items-center justify-center bg-gray-800 rounded-lg mb-4 overflow-hidden">
                <img
                  src={productImage[0] || "/default_image_url.png"}
                  alt={productName}
                  className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2 text-center truncate">
                {productName}
              </h3>
              <p className="text-blue-400 text-xl font-bold">
                ₹{productPrice}
              </p>
              <motion.button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-red-700 focus:outline-none"
                aria-label="Remove from Wishlist"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AiFillDelete className="mr-2" /> Remove
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;