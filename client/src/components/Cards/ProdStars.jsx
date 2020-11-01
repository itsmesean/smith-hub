import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ProdStars({ prodStars }) {
  const squares = prodStars.map((day, i) => {
    return (
      <FontAwesomeIcon
        icon={faStar}
        color={day === 1 ? `#008a7e` : `#e94560`}
        key={i}
      />
    );
  });

  return <div className="StarsGraph">{squares}</div>;
}

export default ProdStars;
