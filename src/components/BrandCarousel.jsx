import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BrandCarousel = ({ brands }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
    >
      {brands.map((brand) => (
        <SwiperSlide key={brand._id}>
          <div className="flex flex-col items-center">
            <Link
              to={`/products/${brand._id}`}
              className="block mb-2 text-blue-500 hover:underline"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
              <span className="text-center">{brand.name}</span>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandCarousel;
