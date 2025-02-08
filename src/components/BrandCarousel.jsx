import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BrandCarousel = ({ brands }) => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-400">Trusted Brands</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={2}
        navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="pb-6"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <div className="group bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow-lg transition-all hover:shadow-blue-500">
              <Link to={`/products/${brand._id}`} className="flex flex-col items-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-28 h-28 rounded-lg object-cover mb-4 border border-gray-600 group-hover:border-blue-400 transition-all"
                />
                <span className="text-lg font-medium text-gray-300 group-hover:text-blue-400 transition-all">
                  {brand.name}
                </span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-blue-400 transition-all">
        <FaArrowLeft className="w-5 h-5" />
      </div>
      <div className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-blue-400 transition-all">
        <FaArrowRight className="w-5 h-5" />
      </div>
    </div>
  );
};

export default BrandCarousel;
