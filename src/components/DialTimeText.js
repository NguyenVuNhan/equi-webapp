import React, { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../app/App.context";

const dialRightBoundary = 8;
const dialLeftBoundary = 352;

const DialTimeText = () => {
  const { dialPosition } = useContext(AppStateContext);
  const [dialAppear, setDialAppear] = useState(false);

  useEffect(() => {
    if (
      (dialPosition < dialRightBoundary || dialPosition > dialLeftBoundary) &&
      dialAppear
    ) {
      setDialAppear(false);
    } else if (
      dialPosition > dialRightBoundary &&
      dialPosition < dialLeftBoundary &&
      !dialAppear
    ) {
      setDialAppear(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialPosition]);

  return (
    <text
      x="30"
      y={dialAppear ? 520 : 490}
      fontSize={dialAppear ? 40 : 110}
      fontWeight="300"
      fill="white"
      textAnchor="start"
      transform={
        dialAppear
          ? `rotate(${90 + dialPosition} 540 540)`
          : "rotate(90 540 540)"
      }
    >
      20:20
    </text>
  );
};

export default DialTimeText;
