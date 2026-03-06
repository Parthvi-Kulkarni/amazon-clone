import React from "react";
import "./Home.css";
import Product from "./Product";
import BannerSlider from "./BannerSlider";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <BannerSlider />
        <div className="home__row">
        <Product
            id="1"
            title="Smeg 50's Style Retro Citrus Juicer, CJF01NB, Navy Blue"
            price={219.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/51CwM+ItLeL._AC_SL1300_.jpg"
          />
          <Product
            id="2"
            title="Breville the Toast Select Luxe Toaster, BTA735DBL, Damson Blue"
            price={199.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71wEk52fpVL._AC_SL1500_.jpg"
          />
          <Product
            id="3"
            title="Fellow Corvo EKG Pro Electric Tea Kettle - Stone Blue with Walnut Handle - 0.9 Liter"
            price={280.00}
            rating={5}
            image="https://m.media-amazon.com/images/I/61KV2bEm4fL._AC_SL1500_.jpg"
          />
          <Product
            id="4"
            title="Breville Bambino™ Plus Automatic Espresso Machine, Damson Blue"
            price={499.98}
            rating={5}
            image="https://m.media-amazon.com/images/I/5119v5ZLB-L._AC_SL1200_.jpg"
          />
      </div>

      <div className="home__row">
        <Product
            id="5"
            title="Cobalt Blue Glassware drinking glasses Set of 6, Handcrafted 8-Ounce Cups with Vintage Sunflower Pattern"
            price={65.39}
            rating={5}
            image="https://m.media-amazon.com/images/I/71OapI5WDHL._AC_SL1080_.jpg"
          />
          <Product
            id="6"
            title="Yungala Cobalt Wine Glasses Set of 6 Goblets - Handcrafted Vintage Glassware with Sunflower Motif"
            price={105.80}
            rating={5}
            image="https://m.media-amazon.com/images/I/71M-WZSBZIL._AC_SL1080_.jpg"
          />
          <Product
            id="7"
            title="Hand-Blown Glass Drink Pitcher From Mexico – Solid Semi-Transparent Cobalt Blue"
            price={117.70}
            rating={5}
            image="https://m.media-amazon.com/images/I/71af2yW6YjL._AC_SL1500_.jpg"
          />
      </div>

      <div className="home__row">
        <Product
            id="8"
            title="The Power of Now: A Guide to Spiritual Enlightenment"
            price={26.50}
            rating={5}
            image="https://m.media-amazon.com/images/I/61Ij8nLooNL._SL1500_.jpg"
          />
          <Product
            id="9"
            title="A Cup of Zen: 21 Short Stories to Calm the Mind"
            price={19.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71+YC9iwLhL._SL1500_.jpg"
          />
          <Product
            id="10"
            title="The Alchemist: A Modern Classic Fable of Spiritual Healing"
            price={21.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71+2-t7M35L._SL1500_.jpg"
          />
          <Product
            id="11"
            title="The Untethered Soul: The Journey Beyond Yourself"
            price={19.80}
            rating={5}
            image="https://m.media-amazon.com/images/I/61HtJhW6adL._SL1500_.jpg"
          />
      </div>
      </div>

    </div>
    );
};

export default Home;