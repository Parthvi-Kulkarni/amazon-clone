import React, { useState, useEffect } from "react";
import "./BannerSlider.css";

const bannerImages = [
  "https://m.media-amazon.com/images/I/81bqEyikPyL._SX3000_.jpg",
  "https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/d93bde2a-beed-4e69-9954-d1eb4dc79b30.jpg",
  "https://m.media-amazon.com/images/I/71DFIP49rjL._SX3000_.jpg",
];

function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerImages.length);
    }, 6000); //change every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bannerSlider">
      {bannerImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`banner-${i}`}
          className={`bannerSlider__image ${index === i ? "active" : ""}`}
        />
      ))}
    </div>
  );
}

export default BannerSlider;