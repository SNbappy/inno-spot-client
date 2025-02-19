import { Helmet } from "react-helmet";
import CouponCarousel from "../../CouponCarousel/CouponCarousel";
import TrendingProductsSection from "../../TrendingProductsSection/TrendingProductsSection";
import BannerSlider from "../BannerSlider/BannerSlider";
import EmpoweringInnovation from "../EmpoweringInnovation/EmpoweringInnovation";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Reviews from "../reviews/reviews";
import SuccessMetrics from "../SuccessMetrics/SuccessMetrics";
import WhatWeProvide from "../WhatWeProvide/WhatWeProvide";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | InnoSpot</title>
            </Helmet>
            <BannerSlider />
            <WhatWeProvide />
            <EmpoweringInnovation />
            <FeaturedProducts />
            <TrendingProductsSection />
            <SuccessMetrics />
            <Reviews />
            <CouponCarousel />
        </div>
    );
};

export default Home;