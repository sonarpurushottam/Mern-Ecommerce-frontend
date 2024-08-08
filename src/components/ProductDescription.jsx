import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product");
      }
    };

    fetchProduct();
  }, [id]);

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to cart");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/cart`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart");
    }
  };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/wishlist`,
        { productId: product._id },
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

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="w-full h-64 md:h-96 mb-4 rounded-lg"
          >
            {product.productImage.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  src={image}
                  alt={`Product ${index}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Add to Wishlist
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review._id} className="border-b py-4">
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-yellow-500">{`${review.rating} stars`}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
