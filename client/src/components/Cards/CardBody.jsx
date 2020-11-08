import React from "react";

import Icon from "../Icon";

function CardBody({
  totalCommits,
  totalPRs,
  starsGiven,
  avatarUrl,
  login,
  createdAt,
  url,
}) {
  return (
    <div className="body">
      <div className="body__main">
        <div className="stats__top">
          <div className="stat">
            <Icon type="commits" />
            {totalCommits}
            <span className="tooltip">
              <div>total commits</div>
            </span>
          </div>
          <div className="stat">
            <Icon type="prs" />
            {totalPRs}
            <span className="tooltip">
              <div>total pull requests</div>
            </span>
          </div>
          <div className="stat">
            <Icon type="star" />
            {starsGiven.length}
            <span className="tooltip">
              <div>total stars given</div>
            </span>
          </div>
        </div>
        <img className="avatar__img" src={avatarUrl} alt="" />
        <div className="stats__bottom">
          <div>
            <a href={url} target="_blank" rel="noreferrer">
              <Icon type="github" />
              {login}
            </a>
          </div>
          <div className="stat">
            {createdAt} <span>days</span>
            <span className="tooltip">
              <div>account age</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBody;
