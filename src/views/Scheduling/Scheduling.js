import React from "react";

const Scheduling = () => {
  const renderDataLine = (percentage, r) => {
    const circumference = Math.PI * ((220 + r) * 2);

    return (
      <circle
        r={220 + r}
        cx="540"
        cy="540"
        fill="transparent"
        stroke="#ce4b99"
        stroke-width="10"
        stroke-dasharray={`${circumference}`}
        stroke-dashoffset={`${circumference * (1 - percentage / 100)}`}
        transform="rotate(-90 540 540)"
        stroke-linecap="round"
      />
    );
  };

  return (
    <g>
      <g mask="url(#mask0)">
        {[10, 50, 60, 40, 90, 50, 90].map((value, index) =>
          renderDataLine(value, (index + 1) * 20)
        )}
      </g>
    </g>
  );
};

export default Scheduling;
