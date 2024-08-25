import { motion } from 'framer-motion';

const testimonials = [
  { name: 'John Doe', content: 'Great shopping experience!', avatar: '/path-to-avatar1.jpg' },
  { name: 'Jane Smith', content: 'Fast delivery and quality products.', avatar: '/path-to-avatar2.jpg' },
  { name: 'Michael Lee', content: 'I love this store!', avatar: '/path-to-avatar3.jpg' },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
            
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
