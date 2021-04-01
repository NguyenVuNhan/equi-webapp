import '../../App.css';
import React, { Component } from 'react';
import { ReactSVG } from 'react-svg';
import Background, {CablesArea, Potentiometer} from './items/components';

class Menu extends Component {
  // handle svg file with arrows
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="equi">
        <Background>
          <Potentiometer/>
          <CablesArea/>
        </Background>
      </div>
    );
  }
}

export default Menu;
