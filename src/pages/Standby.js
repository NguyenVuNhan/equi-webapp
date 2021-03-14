import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadApi } from "../actions/apiAction";

//import P5 wrapper
import P5Wrapper from "react-p5-wrapper";
import batteryDisplay from "./Scripts/batteryDisplay";

const Standby = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadApi());
  }, [dispatch]);

  const { apiData } = useSelector((state) => state.api);

  if (apiData.data) {
    console.log(apiData);
  }

  return <P5Wrapper sketch={batteryDisplay} />;
};

export default Standby;
