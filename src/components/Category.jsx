import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/categories/get"
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        // slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: false }}
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
            slidesPerView: 5,
            spaceBetween: 1,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center">
              <Link to={`/brands/${category._id}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <span className="text-center">{category.name}</span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
