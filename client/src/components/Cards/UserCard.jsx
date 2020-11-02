import React from "react";

import ActivityGraph from "./ActivityGraph";
import ProdStars from "./ProdStars";

function UserCard({ name, login, url, avatar_url, activity, prodStars }) {
  return (
    <div className="userCard">
      <div className="cardHeader">
        <span>{name}</span>
      </div>
      <div className="body">
        <ProdStars prodStars={prodStars} />
      </div>
      <div className="activity">
        <span>recent activity</span>
        <ActivityGraph activity={activity} />
      </div>
    </div>
  );
}

export default UserCard;
