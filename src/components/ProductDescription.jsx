// ProductDescription.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

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

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to cart");
      navigate("/login");
      return;
    }
    // Add to cart logic here
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn()) {
      toast.error("You need to be logged in to add to wishlist");
      navigate("/login");
      return;
    }
    // Add to wishlist logic here
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <motion.img
            src={product.productImage[0]}
            alt={product.name}
            className="w-full h-auto object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Add to Wishlist
            </button>
          </div>
          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Reviews</h3>
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review._id} className="border-b py-4">
                  <p className="font-semibold">{review.user.name}</p>
                  <p>{review.comment}</p>
                  <p className="text-gray-600">{review.rating} stars</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
