import React from "react";

function ActivityGraph({ activity }) {
  const squares = activity.map((day, i) => {
    return <span data-level={day} key={`my_key${i}`} />;
  });

  return <div className="graph">{squares}</div>;
}

export default ActivityGraph;
