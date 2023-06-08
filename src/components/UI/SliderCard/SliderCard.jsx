import React from "react";
import styles from './SliderCard.module.css';

const SliderCard = ({ number}) => {
  return <div className={styles.sliderCard}>{number}</div>;
};

export default SliderCard;