import React from 'react';

interface DataBubbleProps {
  name: string;
  text: string;
  gradientColor: React.ReactNode;
  icon: React.ReactNode;
  textX?: number;
  y?: number;
}

const DataBubble = (props: DataBubbleProps) => {
  const { text, name, gradientColor, icon, textX = 55, y = 130 } = props;
  const textLength = text.length * 17 + 30;

  return (
    <g
      style={{
        transform: `translateX(${
          504 - textX - textLength
        }px) translateY(${y}px)`,
      }}
    >
      <mask
        id={`${name}Mask`}
        mask-type="alpha"
        x="0"
        y="0"
        width={`${15 + textX + textLength}px `}
        height="300px"
      >
        <rect width={`${textX + textLength}`} height="150" fill="black" />
      </mask>

      <g mask={`url(#${name}Mask)`}>
        <rect
          width={`${100 + textLength}`}
          height="64"
          rx="32"
          fill={`url(#${name}Color)`}
        />

        {icon}
        <text x={textX} y="45" fontSize="35" fill="white">
          {text}
        </text>

        <defs>
          <linearGradient
            id={`${name}Color`}
            x1="0"
            y1="0"
            x2="154"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            {gradientColor}
          </linearGradient>
        </defs>
      </g>
    </g>
  );
};

export default DataBubble;
