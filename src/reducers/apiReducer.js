const initState = {
  apiData: [],
};

const apiReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, apiData: action.payload.popular };
    default:
      return { ...state };
  }
};
