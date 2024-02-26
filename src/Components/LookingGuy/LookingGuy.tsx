import React, { useState, useEffect } from "react";

import "./LookingGuy.scss";

export const LookingGuy: React.FC = () => {
  const [lookingDirection, setLookingDirection] = useState("forward");

  useEffect(() => {
    const interval = setInterval(() => {
      const directions = ["forward", "left", "right", "up", "down"];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      setLookingDirection(randomDirection);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="no-items">
      <div className={`looking-guy ${lookingDirection}`}>
        <div className="eye left-eye" />
        <div className="eye right-eye" />
      </div>
      <p className="no-items__message">Currently, there are no items to display. </p>
      <p>However, stay tuned as items will appear shortly. Thank you for your patience.</p>
    </div>
  );
};
