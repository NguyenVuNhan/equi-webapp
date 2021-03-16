import axios from "axios";

//action creator

export const loadApi = () => async (dispatch) => {
  const base_url = "https://api.coindesk.com/v1/bpi/currentprice/CNY.json";
  const apiData = await axios.get(base_url);

  dispatch({
    type: "FETCH_DATA",
    payload: {
      apiData: apiData,
    },
  });
};
