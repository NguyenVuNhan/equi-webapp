import React from "react";
import "./App.css";
import P5Wrapper from "react-p5-wrapper";
import Standby from "../pages/Standby";
import SelectionMenu from "../pages/SelectionMenu";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Standby />
        <SelectionMenu />
      </div>
    );
  }
}

export default App;
