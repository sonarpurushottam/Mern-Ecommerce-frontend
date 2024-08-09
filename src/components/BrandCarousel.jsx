import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BrandCarousel = ({ brands }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
        Our Brands
      </h1>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={false} // Disable pagination dots
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand._id}>
              <motion.div
                className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/products/${brand._id}`}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-200 shadow-md transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                  <span className="text-lg font-semibold text-gray-800">
                    {brand.name}
                  </span>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 cursor-pointer z-10 shadow-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out">
          <FaArrowLeft className="w-6 h-6" />
        </div>
        <div className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 cursor-pointer z-10 shadow-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out">
          <FaArrowRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
