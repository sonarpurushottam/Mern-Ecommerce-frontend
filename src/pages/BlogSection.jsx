import { motion } from 'framer-motion';

const blogPosts = [
  { title: 'How to Choose the Right Product', date: 'July 20, 2024', excerpt: 'Choosing the right product can be daunting, but with our guide, you’ll find the perfect match.', image: '/images/blog1.jpg' },
  { title: 'Top 10 Products of the Year', date: 'August 10, 2024', excerpt: 'Discover the best products of the year, handpicked by our team of experts.', image: '/images/blog2.jpg' },
  { title: 'Customer Success Stories', date: 'August 25, 2024', excerpt: 'Read about our customers who have had great success using our products.', image: '/images/blog3.jpg' },
];

const BlogSection = () => {
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
          From Our Blog
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
