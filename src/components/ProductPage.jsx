import { useParams } from "react-router-dom";
import { useProductsByBrand } from "../hooks/useProducts";
import ProductGrid from "./ProductGrid";
import { motion } from "framer-motion";

const ProductPage = () => {
  const { brandId } = useParams();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProductsByBrand(brandId);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full"
        ></motion.div>
      </div>
    );
  if (isError) {
    console.error("Error fetching products:", error);
    return <div className="text-red-500 text-center mt-10">Error fetching products</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-8 bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-10 text-gray-100 tracking-wider"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Exclusive Collections
      </motion.h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductPage;
