import { motion } from 'framer-motion';

const galleryImages = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
];

const GallerySection = () => {
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
          Our Gallery
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
