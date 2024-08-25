import { motion } from 'framer-motion';

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Stay Updated
        </motion.h2>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Sign up for our newsletter to receive the latest news and exclusive offers.
        </motion.p>
        <motion.form
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md p-2 rounded-l-lg focus:outline-none"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg">
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
