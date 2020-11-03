/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";

import ActivityGraph from "./ActivityGraph";
import ProdStars from "./ProdStars";

function UserCard({
  name,
  login,
  url,
  avatarUrl,
  activity,
  prodStars,
  starAll,
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
      <div className="body">
        <div className="img__line" />
        <img className="avatar__img" src={avatarUrl} alt="" />
        <div className="img__line" />
      </div>
      <div className="activity">
        <span>recent activity</span>
        <ActivityGraph activity={activity} />
      </div>
    </div>
  );
}

export default UserCard;
