import React, { useState } from "react";

function CardBody({
  totalCommits,
  totalPRs,
  starsGiven,
  avatarUrl,
  createdAt,
}) {
  return (
    <div className="body">
      <div className="body__main">
        <div className="stats__left">
          <div className="stat">
            <svg
              className="icon"
              x="0"
              y="-13"
              viewBox="0 0 16 16"
              version="1.1"
            >
              <path
                fillRule="evenodd"
                d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"
              />
            </svg>
            {totalCommits}
            <span className="tooltip">
              <div>total commits</div>
            </span>
          </div>
          <div className="stat">
            <svg
              className="icon"
              x="0"
              y="-13"
              viewBox="0 0 16 16"
              version="1.1"
            >
              <path
                fillRule="evenodd"
                d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"
              />
            </svg>
            {totalPRs}
            <span className="tooltip">
              <div>total pull requests</div>
            </span>
          </div>
          <div className="stat">
            <svg
              className="icon"
              x="0"
              y="-13"
              viewBox="0 0 16 16"
              version="1.1"
            >
              <path
                fillRule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              />
            </svg>
            {starsGiven}
            <span className="tooltip">
              <div>Total stars given</div>
            </span>
          </div>
        </div>
        <img className="avatar__img" src={avatarUrl} alt="" />
        <div className="stats__right" />
      </div>
      <div className="body__footer">
        <div>joined {createdAt}</div>
      </div>
    </div>
  );
}

export default CardBody;
