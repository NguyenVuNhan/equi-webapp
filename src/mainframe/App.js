import React from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import batteryDisplay from '../pages/Scripts/batteryDisplay';
import menu from '../pages/Scripts/mainMenu';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <P5Wrapper sketch={menu}/>
        <P5Wrapper sketch={batteryDisplay}/>
      </div>
    );
  }
}


export default App;



