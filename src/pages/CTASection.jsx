import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
        <p className="text-lg mb-8">
          Join us today and be the first to know about exclusive deals and
          latest arrivals.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition"
        >
          Sign Up Now
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;
