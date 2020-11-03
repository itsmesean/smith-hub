import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ProdStars({ prodStars }) {
  const [stars, setStars] = useState(prodStars);
  const items = stars.map((day, i) => {
    return (
      <FontAwesomeIcon
        icon={faStar}
        className="star"
        color={day === 1 ? `#008a7e` : `#e94560`}
        key={i}
      />
    );
  });

  return (
    <div className="StarsGraph">
      <span className="stars__label">Project Stars</span>
      <div className="stars__box">{items}</div>
    </div>
  );
}

export default ProdStars;
