import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadApi } from "../actions/apiAction";

//import P5 wrapper
import P5Wrapper from "react-p5-wrapper";
import batteryDisplay from "../WelcomeScreen/batteryDisplay";

const Standby = () => {
  return <P5Wrapper sketch={batteryDisplay} />;
};

export default Standby;
