import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadApi } from "../actions/apiAction";

//import P5 wrapper & scripts
import P5Wrapper from "react-p5-wrapper";
import batteryDisplay from "./Scripts/batteryDisplay";
import energyParticles from "./Scripts/energyParticles";

//import Libraries
import styled from "styled-components";

const Standby = () => {
  //fetching api data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadApi());
  }, [dispatch]);

  const { apiData } = useSelector((state) => state.api);

  if (apiData.data) {
    console.log(apiData.data.bpi.USD.rate);
  }

  return (
    <styledBatteryDisplay>
      {apiData.data && (
        <P5Wrapper
          sketch={batteryDisplay}
          batteryLevel={apiData.data.bpi.USD.rate}
        />
      )}
    </styledBatteryDisplay>
  );
};

const styledBatteryDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export default Standby;
