import React from "react";
import PropTypes from "prop-types";

const AppliancePowerConsumption = ({ powerConsumption }) => {
  const textLength = powerConsumption.length * 17 + 30;

  return (
    <g
      style={{
        transform: `translateX(${439 - textLength}px) translateY(130px)`,
      }}
    >
      <mask
        id="AppliancePowerConsumptionMask"
        mask-type="alpha"
        x="0"
        y="0"
        width={`${70 + textLength}px `}
        height="300px"
      >
        <rect width={`${65 + textLength}`} height="150" fill="black" />
      </mask>

      <g mask="url(#AppliancePowerConsumptionMask)">
        <rect
          width={`${100 + textLength}`}
          height="64"
          rx="32"
          fill="url(#AppliancePowerConsumptionColor)"
        />

        <path
          d="M39.4791 20.7922C39.8345 19.8432 38.624 19.1145 37.9964 19.8997L27.9256 32.5005C27.5088 33.0219 27.7804 33.813 28.4226 33.9484L34.7556 35.2832L31.4731 44.1676C31.1176 45.1299 32.3596 45.8496 32.9726 45.0365L42.5444 32.3407C42.9397 31.8163 42.6638 31.0465 42.0327 30.9129L36.1551 29.6683L39.4791 20.7922Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.7556 18.0674C57.6586 25.9924 57.6518 38.8235 49.7352 46.7401C41.8119 54.6635 28.9655 54.6635 21.0421 46.7401C13.9715 39.6695 13.2105 28.6787 18.7591 20.7642L16.2597 20.9112C15.4461 20.9591 14.7478 20.3384 14.7 19.5248C14.6521 18.7113 15.2728 18.013 16.0864 17.9652L21.9989 17.6174C22.7436 17.5736 23.4038 18.0925 23.5373 18.8264L24.5807 24.5651C24.7265 25.3669 24.1947 26.135 23.3929 26.2808C22.5911 26.4266 21.8229 25.8948 21.6771 25.093L21.1936 22.4335C16.435 29.1984 17.0801 38.6046 23.1289 44.6534C29.8998 51.4242 40.8776 51.4242 47.6485 44.6534C54.4194 37.8825 54.4194 26.9047 47.6485 20.1338C47.6346 20.1199 47.6209 20.1057 47.6076 20.0913C45.6146 17.9322 39.2004 13.729 30.3491 15.4808C29.5497 15.6391 28.7734 15.1193 28.6151 14.3198C28.4569 13.5204 28.9767 12.7441 29.7761 12.5859C39.7855 10.6048 47.1799 15.2946 49.7556 18.0674Z"
          fill="white"
        />

        <text x="65" y="45" fontSize="35" fill="white">
          {powerConsumption}
        </text>

        <defs>
          <linearGradient
            id="AppliancePowerConsumptionColor"
            x1="0"
            y1="0"
            x2="154"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E24C3A" />
            <stop offset="1" stopColor="#E24C3A" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </g>
    </g>
  );
};

AppliancePowerConsumption.propTypes = {
  powerConsumption: PropTypes.string.isRequired,
};

export default AppliancePowerConsumption;
