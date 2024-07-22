import React, { useEffect, useState } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
// import { sareePage1 } from "../Data/Saree/page1";
// import { dressPage1 } from "../Data/dress/page1";
// import { gounsPage1 } from "../Data/Gouns/gouns";
// import { kurtaPage1 } from "../Data/Kurta/kurta";
// import { mensShoesPage1 } from "../Data/shoes";
// import { mens_kurta } from "../Data/Men/men_kurta";
// import { lengha_page1 } from "../Data/Women/LenghaCholi";
import { receiveGetContent, receiveProducts } from "../action";
import { getCartItems } from "../action/cart";
import { getCustomerInfo } from "../action/cart";
import { useDispatch } from "react-redux";
import Loader from "../customer/Components/Loader/Loader";

const Homepage = () => {
  const [topProducts, setTopProducts] = useState();
  const [banners, setBanners] = useState();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  let token = localStorage.getItem("accessToken");

  useEffect(() => {
    receiveProducts().then((data) => {
      setTopProducts(data.data.products.edges);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    receiveGetContent().then((data) => {
      // console.log("this is banners", data);

      setBanners(data);
    });
  }, []);

  useEffect(() => {
    if (token) {
      getCustomerInfo();
    }
  }, []);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  console.log("this is landing page", topProducts);
  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <>
          <HomeCarousel images={banners} />

          <div className="space-y-1 py-2">
            <HomeProductSection
              data={topProducts?.slice(0, 10)}
              section={"Top Products"}
            />

            <HomeProductSection
              data={topProducts?.slice(10, 19)}
              section={"Latest Products"}
            />
            {/* <HomeProductSection data={mensShoesPage1} section={"Men's Shoes"} />
  <HomeProductSection data={lengha_page1} section={"Lengha Choli"} />
  <HomeProductSection data={sareePage1} section={"Saree"} />
  <HomeProductSection data={dressPage1} section={"Dress"} />
  <HomeProductSection data={gounsPage1} section={"Women's Gouns"} />
  <HomeProductSection data={kurtaPage1} section={"Women's Kurtas"} /> */}
            {/* <HomeProductSection data={mensPantsPage1} section={"Men's Pants"} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
