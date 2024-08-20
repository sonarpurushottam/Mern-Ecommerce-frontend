// import HeroSection from "../components/HeroSection";
// import headphone from "../assets/hero/headphone.png";
// import smartwatch2 from "../assets/category/smartwatch2-removebg-preview.png";
import Category from "./../components/Category";


const Home = () => {
  console.log(localStorage.getItem("role")); // Should log the role if stored correctly
  console.log(localStorage.getItem("token"));
  // const BannerData = {
  //   discount: "30% OFF",
  //   title: "Fine Smile",
  //   date: "10 Jan to 28 Jan",
  //   image: headphone,
  //   title2: "Air Solo Bass",
  //   title3: "Winter Sale",
  //   title4:
  //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  //   bgColor: "#f42c37",
  // };

  // const BannerData2 = {
  //   discount: "30% OFF",
  //   title: "Happy Hours",
  //   date: "14 Jan to 28 Jan",
  //   image: smartwatch2,
  //   title2: "Smart Solo",
  //   title3: "Winter Sale",
  //   title4:
  //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  //   bgColor: "#2dcc6f",
  // };
  window.location.reload();
  return (
    <div className="container mx-auto p-4">
      <Category />
      
      {/* <HeroSection /> */}
    </div>
  );
};

export default Home;
