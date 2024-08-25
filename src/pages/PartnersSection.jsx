import { motion } from 'framer-motion';

const partners = [
  { name: 'Partner 1', logo: '/path-to-logo1.jpg' },
  { name: 'Partner 2', logo: '/path-to-logo2.jpg' },
  { name: 'Partner 3', logo: '/path-to-logo3.jpg' },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Partners
        </motion.h2>
        <div className="flex justify-center space-x-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="flex justify-center items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={partner.logo} alt={partner.name} className="h-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
