import React from "react";
import "./page-loader.scss";

export const PageLoader = () => {
  return (
    <div className="loader">
      {/* Loading animation modified from https://codepen.io/lucawater/pen/VwQVyj */}
      {/* Illustration inspiration by Dennis de Groot */}
      <div className="bike">
        <div className="part frame">
          <div className="bar left-top" />
          <div className="bar left-bottom" />
          <div className="bar left" />
          <div className="bar top" />
          <div className="bar bottom" />
          <div className="bar right" />
        </div>
        <div className="part sadle">
          <div className="sit-here" />
          <div className="sadlepen" />
        </div>
        <div className="part handlebar">
          <div className="stem" />
          <div className="connector" />
          <div className="prehandle" />
          <div className="handle" />
        </div>
        <div className="part pedals">
          <div className="inside" />
          <div className="outside" />
          <div className="pedalstem front">
            <div className="pedalbase front" />
          </div>
          <div className="pedalstem back">
            <div className="pedalbase back" />
          </div>
        </div>
        <div className="part wheel left">
          <div className="disk left" />
          <div className="spokes">
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
          </div>
        </div>
        <div className="part wheel right">
          <div className="disk right" />
          <div className="spokes">
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
            <div className="spoke" />
          </div>
        </div>
        <div className="part axis left" />
        <div className="part axis right" />
      </div>
    </div>
  );
};
