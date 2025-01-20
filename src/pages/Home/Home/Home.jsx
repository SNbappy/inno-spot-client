import CouponCarousel from "../../CouponCarousel/CouponCarousel";
import BannerSlider from "../BannerSlider/BannerSlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

const Home = () => {
    return (
        <div>
            <BannerSlider />
            <FeaturedProducts />
            <CouponCarousel />
        </div>
    );
};

export default Home;