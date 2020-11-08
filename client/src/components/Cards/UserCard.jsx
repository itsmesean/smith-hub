/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

import ActivityGraph from "./ActivityGraph";
import ProdStars from "./ProdStars";
import CardBody from "./CardBody";

function UserCard({
  auth,
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
  const curPP = [
    197829646,
    298694172,
    285941357,
    298697212,
    306221589,
    273597240,
    285937589,
    298639605,
  ];
  const temp = starsGiven.filter((id) => {
    return curPP.includes(id);
  });
  console.log(temp);
  return (
    <div className="userCard">
      <div className="cardHeader">
        <span>{name || login}</span>
        <div className="stars_container">
          <ProdStars prodStars={temp} />
          {prodStars.includes(0) && auth ? (
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
        url={url}
        login={login}
      />
      <div className="activity">
        <span>recent activity</span>
        <ActivityGraph activity={activity} />
      </div>
    </div>
  );
}

export default UserCard;
