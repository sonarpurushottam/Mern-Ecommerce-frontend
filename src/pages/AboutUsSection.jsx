import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We are dedicated to providing the best shopping experience. Our mission is to offer quality products at the best prices, along with exceptional customer service.
        </motion.p>
        <motion.a
          href="/about"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Learn More
        </motion.a>
      </div>
    </section>
  );
};

export default AboutUsSection;
