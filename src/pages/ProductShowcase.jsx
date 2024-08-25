import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { id: 1, name: 'Product 1', image: '/path-to-image1.jpg', price: '$100' },
  { id: 2, name: 'Product 2', image: '/path-to-image2.jpg', price: '$150' },
  { id: 3, name: 'Product 3', image: '/path-to-image3.jpg', price: '$200' },
  
];

const ProductShowcase = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <Slider {...settings}>
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 p-6 rounded-lg">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductShowcase;
