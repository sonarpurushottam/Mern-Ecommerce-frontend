// // CategorySlider.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// const CategorySlider = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/categories/get");
//         setCategories(res.data);
//       } catch (error) {
//         console.error("Error fetching categories", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/brands/${categoryId}`);
//   };

//   return (
//     <div className="category-slider">
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={10}
//         slidesPerView={3}
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//         }}
//       >
//         {categories.map((category) => (
//           <SwiperSlide key={category._id}>
//             <div
//               onClick={() => handleCategoryClick(category._id)}
//               className="category-item"
//             >
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="category-image"
//               />
//               <p className="category-name">{category.name}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default CategorySlider;
// CategorySlider.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/get");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/brands/${categoryId._id}`);
  };

  return (
    <div className="category-slider">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div
              onClick={() => handleCategoryClick(category._id)}
              className="category-item"
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <p className="category-name">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
