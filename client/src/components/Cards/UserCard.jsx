/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

import ActivityGraph from "./ActivityGraph";
import ProdStars from "./ProdStars";
import CardBody from "./CardBody";

function UserCard({
  name,
  login,
  url,
  avatarUrl,
  activity,
  prodStars,
  starAll,
  totalCommits,
  totalPRs,
  starsGiven,
  createdAt,
}) {
  return (
    <div className="userCard">
      <div className="cardHeader">
        <span>{name}</span>
        <div className="stars_container">
          <ProdStars prodStars={prodStars} />
          {prodStars.includes(0) ? (
            <div
              className="cog__box"
              onClick={() =>
                window.confirm(
                  "Automatically Star all current production projects?",
                ) && starAll()
              }
            >
              <FontAwesomeIcon icon={faExclamation} className="excl" />
            </div>
          ) : (
            <div className="cog__box">
              <span />
            </div>
          )}
        </div>
      </div>
      <CardBody
        totalCommits={totalCommits}
        totalPRs={totalPRs}
        starsGiven={starsGiven}
        avatarUrl={avatarUrl}
        createdAt={createdAt}
      />
      <div className="activity">
        <span>recent activity</span>
        <ActivityGraph activity={activity} />
      </div>
    </div>
  );
}

export default UserCard;
