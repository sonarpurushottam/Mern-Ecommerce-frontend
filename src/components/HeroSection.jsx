
import Image1 from "../assets/Iphone/Iphone1.png";
import Image2 from "../assets/Iphone/Iphone2.png";
import Image3 from "../assets/Iphone/Iphone3.png";
import Image4 from "../assets/Iphone/Iphone4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

// Arrow components
const CustomPrevArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-prev"
    onClick={onClick}
    style={{
      left: "10px",
      zIndex: 1,
      backgroundColor: "#00798C",
      color: "#fff",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    &lt;
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-next"
    onClick={onClick}
    style={{
      right: "10px",
      zIndex: 1,
      backgroundColor: "#00798C",
      color: "#fff",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    &gt;
  </div>
);

const imageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 30% off on all Earphones",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/Headphones",
  },
  {
    id: 2,
    img: Image2,
    title: "40% off on all TV",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/TV",
  },
  {
    id: 3,
    img: Image3,
    title: "20% off on all Phones",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/Mobiles",
  },
  {
    id: 4,
    img: Image4,
    title: "40% off on all Cameras",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/Camera",
  },
];

const HeroSection = ({ handleOrderPopup }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] flex justify-center items-center dark:text-white duration-200">
      {/* Background Pattern */}
      {/* <div className="h-[700px] w-[700px] absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-10 bg-gray-200"></div> */}

      {/* Hero Section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {imageList.map((data) => (
            <div key={data.id} className="relative">
              <NavLink to={data.link}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Text Content Section */}
                  <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left relative z-10">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00798C]"
                    >
                      {data.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-sm"
                    >
                      {data.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                   
                    </motion.div>
                  </div>

                  {/* Image Section */}
                  <div className="flex justify-center items-center">
                    <LazyLoadImage
                      src={data.img}
                      alt={data.title}
                      effect="blur"
                      className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] object-contain"
                    />
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
