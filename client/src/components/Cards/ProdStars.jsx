import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ProdStars({ prodStars }) {
  const projects = [
    [197829646, "Reactime", "https://github.com/open-source-labs/reactime"],
    [298694172, "GatsbyHub", "https://github.com/oslabs-beta/GatsbyHub"],
    [285941357, "Chromogen", "https://github.com/open-source-labs/Chromogen"],
    [298697212, "StratosDB", "https://github.com/oslabs-beta/StratosDB"],
    [306221589, "Aqls", "https://github.com/oslabs-beta/Aqls-client"],
    [273597240, "Recoilize", "https://github.com/open-source-labs/Recoilize"],
    [285937589, "SeeQR", "https://github.com/open-source-labs/SeeQR"],
    [298639605, "Irisql", "https://github.com/oslabs-beta/irisql"],
  ];

  const items = projects.map((project) => {
    return (
      <a className="stat" href={project[2]} target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          icon={faStar}
          className="star"
          color={prodStars.includes(project[0]) ? `#008a7e` : `#e94560`}
          key={project[0]}
        />
        <span className="tooltip">
          <div>{project[1]}</div>
        </span>
      </a>
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
