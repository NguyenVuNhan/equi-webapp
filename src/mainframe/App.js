import React from "react";
import "./App.css";
import DataDisplayed from "../dataDisplay/dataDisplayed";
import Idle from "../timeDisplay/screenIdle";
import styled from "styled-components";

class App extends React.Component {
  render() {
    return (
      <div className="blackbox">
        <Header>
          <a href="/settings">
            <h2>Settings </h2>
          </a>
          <a href="/clock">
            <h2> Time </h2>
          </a>
          <a href="/home">
            <h2> Energy </h2>
          </a>
        </Header>
        <Body>
          <DataDisplayed />
          <Idle />
        </Body>
      </div>
    );
  }
}

const Header = styled.div`
  width: auto;
  height: 10%;
  display: inline-block;
  background: white;
  overflow: hidden;
  a {
    color: white;
    float: right;
    padding: 1rem 2rem 1rem 2rem;
    &:hover {
      background: #2a2325;
    }
  }
`;

const Body = styled.div`
  width: auto;
  height: 90%;
  background: black;
  resize: both;
  flex-wrap: wrap;
  align-content: center;
  align-self: center;
  justify-content: center;
`;

export default App;
