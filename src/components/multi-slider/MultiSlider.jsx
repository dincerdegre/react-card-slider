import React, { useState, useEffect, useCallback } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import styles from "./MultiSlider.module.css";
import SliderCard from "../UI/SliderCard/SliderCard";

const MultiSlider = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(1260);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const nextSlideHandler = () => {
    setCurrentSlide(
      currentSlide === data.length - slidesToShow ? 0 : (prev) => prev + 1,
    );
  };
  const prevSlideHandler = () => {
    setCurrentSlide(
      currentSlide === 0 ? data.length - slidesToShow : (prev) => prev - 1,
    );
  };
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1260) {
      setWidth(1260);
      setSlidesToShow(4);
    } else if (window.innerWidth < 1260 && window.innerWidth >= 1140) {
      setWidth(1140);
      setSlidesToShow(4);
    } else if (window.innerWidth < 1140 && window.innerWidth >= 1024) {
      setWidth(1024);
      setSlidesToShow(4);
    } else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
      setWidth(768);
      setSlidesToShow(2);
    } else if (window.innerWidth < 768 && window.innerWidth >= 480) {
      setWidth(480);
      setSlidesToShow(1);
    } else if (window.innerWidth < 480) {
      setWidth(window.innerWidth);
      setSlidesToShow(1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <div className={styles.multiSlider}>
      <div className={styles.top} ><h2>Card Slider</h2></div>
      <div className={styles.middle}>
        <div className={styles.iconGroup}>
          <div className={styles.icon} onClick={prevSlideHandler}>
            <ArrowBackIosNewRoundedIcon />
          </div>
          <div className={styles.icon} onClick={nextSlideHandler}>
            <ArrowForwardIosRoundedIcon />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.sliderContainer}>
          <div
            className={styles.sliderWrapper}
            style={{
              transform: `translate3d(-${
                currentSlide * (width / slidesToShow)
              }px,0px,0px)`,
            }}
          >
            {data.map((item, index) => (
              <div
                className={styles.sliderItem}
                key={index}
                style={{ width: `${width / slidesToShow}px` }}
              >
                <SliderCard number={item.number} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSlider;
