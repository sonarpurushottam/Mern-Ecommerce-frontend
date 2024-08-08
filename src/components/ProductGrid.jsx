import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col"
        >
          <div className="relative">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.productImage[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <button
              onClick={() => handleAddToWishlist(product._id)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              aria-label="Add to Wishlist"
            >
              <FaRegHeart className="text-red-500" />
            </button>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-1">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500 ml-2 line-through">
                  ${product.originalPrice}
                </span>
              </p>
            </Link>
          </div>
          <button
            onClick={() => handleAddToCart(product._id)}
            className="bg-blue-500 text-white p-3 rounded-b-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none"
            aria-label="Add to Cart"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
