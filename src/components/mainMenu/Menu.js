import '../../App.css';
import React, { Component } from 'react';
import { Background, CablesArea, Potentiometer} from './items/components';
import ScheduleIcon from './items/schedule';
import Energy from '../mainMenu/items/energy'
import Appliances from '../mainMenu/items/appliances'
import Cancel from '../mainMenu/items/cancel'

class Menu extends Component {
  
  render(){
    return (
      <div className="equi">
        <Background>
          <Potentiometer/>
            <CablesArea/>
              <div className="grid2x2">
                  <div className="eachDiv">
                    <Energy/>
                  </div>
                  <div className="eachDiv">
                    <Cancel/>
                  </div>
                  <div className="eachDiv">
                    <ScheduleIcon/>
                  </div>
                  <div className="eachDiv">
                    <Appliances/>
                  </div>
              </div>
            </Background>
        </div>
    );
  }
}

export default Menu;
