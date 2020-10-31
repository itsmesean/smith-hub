import React from "react";

function ActivityGraph({ activity }) {
  const squares = activity.map((day) => {
    return <span data-level={day > 3 ? 3 : day} />;
  });

  return <div className="graph">{squares}</div>;
}

export default ActivityGraph;
