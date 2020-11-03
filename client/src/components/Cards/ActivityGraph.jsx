import React from "react";

function ActivityGraph({ activity }) {
  const squares = activity.map((day) => {
    return <span data-level={day} />;
  });

  return <div className="graph">{squares}</div>;
}

export default ActivityGraph;
