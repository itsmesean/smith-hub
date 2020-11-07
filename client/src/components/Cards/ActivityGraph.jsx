import React from "react";

function ActivityGraph({ activity }) {
  const squares = activity.map((day, i) => {
    return (
      <span
        className="stat"
        data-level={day.count > 3 ? 4 : day.count}
        key={day.date}
      >
        <span className="tooltip">
          <div>
            {new Date(day.date).toLocaleDateString()}: {day.count}
          </div>
        </span>
      </span>
    );
  });

  return <div className="graph">{squares}</div>;
}

export default ActivityGraph;
