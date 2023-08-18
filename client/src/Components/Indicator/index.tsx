import React from "react";
import "./Indicator.css";

const Indicator = ({
  isVisible,
  showingSide,
}: {
  isVisible: boolean;
  showingSide: "left" | "right";
}) => {
  if (!isVisible) {
    return <div className="empty-div" />;
  }
  if (showingSide === "left") {
    return <div className="left-circle"></div>;
  } else {
    return <div className="right-circle"></div>;
  }
};

export default Indicator;
