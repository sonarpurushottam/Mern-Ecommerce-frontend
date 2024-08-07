// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// const BrandPage = () => {
//   const { categoryId } = useParams();
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(
//           `http://localhost:5000/api/brands/getByCategory/${categoryId}`
//         );
//         setBrands(data);
//       } catch (err) {
//         setError("Error fetching brands");
//         console.error("Error fetching brands", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBrands();
//   }, [categoryId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (brands.length === 0) {
//     return <p>No brands available</p>;
//   }

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Brands</h1>
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         // scrollbar={{ draggable: true }}
//         breakpoints={{
//           640: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 40,
//           },
//           1024: {
//             slidesPerView: 3,
//             spaceBetween: 50,
//           },
//         }}
//       >
//         {brands.map((brand) => (
//           <SwiperSlide key={brand._id}>
//             <div className="flex flex-col items-center">
//               <Link
//                 to={`/products/${brand._id}`}
//                 className="block mb-2 text-blue-500 hover:underline"
//               >
//                 <img
//                   src={brand.image}
//                   alt={brand.name}
//                   className="w-24 h-24 rounded-full object-cover mb-2"
//                 />
//                 <span className="text-center">{brand.name}</span>
//               </Link>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default BrandPage;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BrandPage = () => {
  const { categoryId } = useParams();
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/brands/getByCategory/${categoryId}`
        );
        setBrands(data);
      } catch (err) {
        setError("Error fetching brands");
        console.error("Error fetching brands", err);
      } finally {
        setLoadingBrands(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/category/${categoryId}`
        );
        setProducts(data);
      } catch (err) {
        setError("Error fetching products");
        console.error("Error fetching products", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchBrands();
    fetchProducts();
  }, [categoryId]);

  if (loadingBrands || loadingProducts) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (brands.length === 0 && products.length === 0) {
    return <p>No brands or products available</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
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

      <h2 className="text-xl font-bold mt-8 mb-4">Products in this Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.productImage[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
