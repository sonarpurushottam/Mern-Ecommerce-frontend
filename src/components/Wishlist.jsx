import useWishlist from "../hooks/useWishlist";
import { AiFillDelete } from "react-icons/ai";
// import Breadcrumb from "./Breadcrumbs"; 

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
      <div className="text-center text-gray-500">Your wishlist is empty.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      {/* <Breadcrumb /> */}

      <h2 className="text-3xl font-bold mb-6 text-center">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlist.map((item) => {
          // Ensure item.productId is defined
          const product = item.productId || {};
          const productImage = product.productImage || [];
          const productName = product.name || "Unknown Product";
          const productPrice = product.price || "0";

          return (
            <div
              key={item._id}
              className="wishlist-item p-4 border rounded-lg shadow-md flex flex-col items-center"
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64 mb-4">
                <img
                  src={productImage[0] || "/default_image_url.png"}
                  alt={productName}
                  className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <div className="flex-grow text-center mb-4 px-2">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {productName}
                </h3>
                <p className="text-base sm:text-lg text-gray-700">
                  Price: ₹{productPrice}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="mt-4 py-2 px-4 border border-red-500 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out flex items-center justify-center text-sm sm:text-base"
              >
                <AiFillDelete className="mr-2" /> Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
