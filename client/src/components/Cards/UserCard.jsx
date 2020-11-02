import React from "react";

import ActivityGraph from "./ActivityGraph";
import ProdStars from "./ProdStars";

function UserCard({ name, login, url, avatarUrl, activity, prodStars }) {
  return (
    <div className="userCard">
      <div className="cardHeader">
        <span>{name}</span>
        <div className="stars_container">
          <ProdStars prodStars={prodStars} />
        </div>
      </div>
      <div className="body">
        <img src={avatarUrl} alt="" />
      </div>
      <div className="activity">
        <span>recent activity</span>
        <ActivityGraph activity={activity} />
      </div>
    </div>
  );
}

export default UserCard;
