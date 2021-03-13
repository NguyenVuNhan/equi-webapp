import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadApi } from "../actions/apiAction";

//import P5 wrapper
import P5Wrapper from "react-p5-wrapper";
import menu from "./Scripts/mainMenu";

const mainMenu = () => {
  return <P5Wrapper sketch={menu} />;
};

export default mainMenu;
