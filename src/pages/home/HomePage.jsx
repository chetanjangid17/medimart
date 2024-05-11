import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import ImageSlider from "../../components/homePageProductCard/Imageslider";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";

// const items = [
//     'https://img.freepik.com/free-vector/male-pharmacist-counter-pharmacy_107791-576.jpg',
//     'https://www.wellrx.com/media/u5yere0x/pharmacy-history.jpg',
//     'https://i.pinimg.com/736x/77/3a/4d/773a4d8db3dd9b920fa769b0ba754c6f.jpg',
//   ];


const HomePage = () => {
    return (
        <Layout>
            {/* <ImageSlider items={items}/> */}
            <HeroSection/>
            <Category/>
            <HomePageProductCard/>
            {/* <Testimonial/> */}
            <Track/>
        </Layout>
    );
}

export default HomePage;
