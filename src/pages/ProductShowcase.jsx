import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import product1 from "../assets/p1.webp";
import product2 from "../assets/p2.webp";
import product3 from "../assets/p3.webp";

const products = [
  { id: 1, name: "boat 315", image: product1, price: "₹3000" },
  { id: 2, name: "firebolt ultra2", image: product2, price: "₹1500" },
  { id: 3, name: "noise head3", image: product3, price: "₹3000" },
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
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
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
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
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
