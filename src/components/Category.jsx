import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useCategories } from "../hooks/useCategory";

const Category = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching categories</p>;
  if (!categories || categories.length === 0)
    return <p>No categories available</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
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
            slidesPerView: 5,
            spaceBetween: 1,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center">
              <Link
                to={`/brands/${category._id}`}
                onClick={() => setSelectedCategory(category._id)}
              >
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
