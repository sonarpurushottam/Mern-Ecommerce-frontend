import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white relative z-10">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Our Store
        </motion.h1>
        <motion.p
          className="mt-4 text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Find the best products at unbeatable prices.
        </motion.p>
        <motion.a
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/category"> Shop Now</Link>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
