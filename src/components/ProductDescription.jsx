import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useProductById } from "../hooks/useProducts";
import { useAddToCart, useAddToWishlist } from "../hooks/useCartWishlist";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useProductById(id);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to cart");
      navigate("/login", { state: { redirectTo: `/product/${id}` } });
      return;
    }

    addToCart(product._id);
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to wishlist");
      navigate("/login", { state: { redirectTo: `/product/${id}` } });
      return;
    }

    addToWishlist(product._id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error("Error fetching product:", error);
    return <div>Error fetching product</div>;
  }

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative w-full h-96 md:h-[40rem]">
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="w-full h-full rounded-lg overflow-hidden"
          >
            {product.productImage.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div className="relative w-full h-full">
                  <img
                    src={image}
                    alt={`Product ${index}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col justify-center">
          <motion.h2
            className="text-4xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.name}
          </motion.h2>
          <motion.p
            className="text-2xl text-gray-700 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ₹{product.price}
          </motion.p>
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {product.description}
          </motion.p>
          <div className="flex space-x-4 mb-8">
            <motion.button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
            <motion.button
              onClick={handleAddToWishlist}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
              whileTap={{ scale: 0.95 }}
            >
              Add to Wishlist
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
