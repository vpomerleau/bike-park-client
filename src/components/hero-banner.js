import React from "react";
import './hero-banner.scss';
import heroImage from '../assets/images/vander-films-IGZgfepL4qY-unsplash.jpg';

export const HeroBanner = () => {

  return (
    <div className="hero-banner">
        <img className="hero-banner__image" src={heroImage} alt="React logo" height='300'/>
    </div>
  );
};
