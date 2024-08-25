import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <motion.div
          className="flex justify-center space-x-6 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">Shop</a>
          <a href="#" className="hover:text-blue-400">Contact</a>
        </motion.div>
        <p className="text-gray-500">&copy; 2024 Ecommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
