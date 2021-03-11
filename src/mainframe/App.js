import "./App.css";
import React, { useEffect } from "react";
import Standby from "../pages/Standby";

import { useDispatch } from "react-redux";
import { loadApi } from "../actions/apiAction";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Standby />
      </div>
    );
  }
}

export default App;
