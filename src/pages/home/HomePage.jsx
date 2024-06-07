import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import ImageSlider from "../../components/homePageProductCard/ImageSlider";
import Track from "../../components/track/Track";

const items = [
  "https://img.freepik.com/free-vector/male-pharmacist-counter-pharmacy_107791-576.jpg",
  "https://www.wellrx.com/media/u5yere0x/pharmacy-history.jpg",
];
const im = [
  "https://i.pinimg.com/736x/77/3a/4d/773a4d8db3dd9b920fa769b0ba754c6f.jpg",
  "https://img.freepik.com/free-vector/male-pharmacist-counter-pharmacy_107791-576.jpg",
];

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <div className="bg-gradient-to-l p-2 to-pink-200 from-[#3B4A61]">
        <div className="flex flex-row lg:h-[40vh] mb-8 mt-7 rounded-3xl overflow-hidden">
          <ImageSlider items={items} />
          <ImageSlider items={im} />
        </div>
      </div>

      <HomePageProductCard />
      {/* <Testimonial/> */}
      <Track />
    </Layout>
  );
};

export default HomePage;
