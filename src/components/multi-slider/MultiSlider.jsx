import React, { useState, useEffect, useCallback } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import styles from "./MultiSlider.module.css";
import SliderCard from "../UI/SliderCard/SliderCard";

const MultiSlider = ({ data , group = 0}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const nextSlideHandler = () => {
    if (group) {
      setCurrentSlide(
        currentSlide >= data.length / slidesToShow - 1 ? 0 : (prev) => prev + 1,
      );
    } else {
      setCurrentSlide(
        currentSlide === data.length - slidesToShow ? 0 : (prev) => prev + 1,
      );
    }
    
  };
  const prevSlideHandler = () => {
    if (group) {
      setCurrentSlide(
        currentSlide === 0 ? Math.ceil(data.length / slidesToShow) - 1: (prev) => prev - 1,
      );
    } else {
      setCurrentSlide(
        currentSlide === 0 ? data.length - slidesToShow : (prev) => prev - 1,
      );
    }
    
  };
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1260) {
      setWidth(1260);
      setSlidesToShow(4);
      setCurrentSlide(0);
    } else if (window.innerWidth < 1260 && window.innerWidth >= 1140) {
      setWidth(1140);
      setSlidesToShow(4);
      setCurrentSlide(0);
    } else if (window.innerWidth < 1140 && window.innerWidth >= 1024) {
      setWidth(1024);
      setSlidesToShow(4);
      setCurrentSlide(0);
    } else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
      setWidth(768);
      setSlidesToShow(2);
      setCurrentSlide(0);
    } else if (window.innerWidth < 768 && window.innerWidth >= 480) {
      setWidth(480);
      setSlidesToShow(1);
      setCurrentSlide(0);
    } else if (window.innerWidth < 480) {
      setWidth(window.innerWidth);
      setSlidesToShow(1);
      setCurrentSlide(0);
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

  let sliderTransform = width / slidesToShow;
  if (group) {
    sliderTransform = width;
  }

  return (
    <div className={styles.multiSlider}>
      <div className={styles.top}>
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
        {width && (<div className={styles.sliderContainer}>
          <div
            className={styles.sliderWrapper}
            style={{
              transform: `translate3d(-${
                currentSlide * (sliderTransform)
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
        </div>) }
      </div>
    </div>
  );
};

export default MultiSlider;
