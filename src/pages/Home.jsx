import HeroSection from "../components/HeroSection";
import Category from "./../components/Category/Category";
import Category2 from "./../components/Category/Category2";
import Hero from "./../components/Hero/Hero";
// import Services from "./../components/Services/Services";
import Banner from "./../components/Banner/Banner";
import Products from "./../components/Products/Products";
import Blogs from "./../components/Blogs/Blogs";
import Partners from "./../components/Partners/Partners";
import Footer from "./../components/Footer/Footer";
import Popup from "./../components/Popup/Popup";
import headphone from "../assets/hero/headphone.png";
import smartwatch2 from "../assets/category/smartwatch2-removebg-preview.png";

const Home = () => {
  console.log(localStorage.getItem("role")); // Should log the role if stored correctly
  console.log(localStorage.getItem("token"));
  const BannerData = {
    discount: "30% OFF",
    title: "Fine Smile",
    date: "10 Jan to 28 Jan",
    image: headphone,
    title2: "Air Solo Bass",
    title3: "Winter Sale",
    title4:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
    bgColor: "#f42c37",
  };

  const BannerData2 = {
    discount: "30% OFF",
    title: "Happy Hours",
    date: "14 Jan to 28 Jan",
    image: smartwatch2,
    title2: "Smart Solo",
    title3: "Winter Sale",
    title4:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
    bgColor: "#2dcc6f",
  };
  return (
    <div className="container mx-auto p-4">
      <HeroSection />
      <Category />
      <Category2 />
      <Hero />
      {/* <Services /> */}
      <Banner data={BannerData} />
      <Products />
      <Banner data={BannerData2} />
      <Blogs />
      <Partners />
      <Footer />
      <Popup />
      <h1 className="text-2xl font-bold">Home</h1>
    </div>
  );
};

export default Home;
