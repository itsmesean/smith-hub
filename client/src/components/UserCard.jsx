import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ActivityGraph from "./ActivityGraph";
import ProdStars from "./ProdStars";

function UserCard({ name, login, url, avatar_url, activity, prodStars }) {
  // avatar_url || (avatar_url = `https://robohash.org/${login}`);

  return (
    <div className="container userCard">
      <div className="userCard__heading">
        <FontAwesomeIcon icon={faCog} color="grey" className="cog" />
      </div>
      <div className="container userCard__main">
        <span>{name}</span>
        <ProdStars prodStars={prodStars} />
      </div>
      <div className="userCard__footer">
        <ActivityGraph activity={activity} />
        {/* <a href={url}>{login}</a> */}
      </div>
    </div>
  );
}

export default UserCard;
