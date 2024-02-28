import React, { useState, useEffect } from "react";

import "./LookingGuy.scss";

interface Props {
  mainMessage: string;
  secondMessage?: string;
}

const directions = ["forward", "left", "right", "up", "down"];

export const LookingGuy: React.FC<Props> = ({ mainMessage, secondMessage }) => {
  const [lookingDirection, setLookingDirection] = useState("forward");

  useEffect(() => {
    const interval = setInterval(() => {
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
      <p className="no-items__message">{mainMessage}</p>
      {secondMessage && <p>{secondMessage}</p>}
    </div>
  );
};
