import '../../App.css';
import styled from 'styled-components';
import React, { Component } from 'react';
import { ReactSVG } from 'react-svg';
import EnergySVG from '../../svg/Energy.svg';

import Background, {CablesArea,ForCircle, Potentiometer, Button, Energy} from './items/components';

class Menu extends Component {
  // handle svg file with arrows
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="equi" >
        <div className="equiBackground">
        <div className="potentiometerPosition"/>
        <div className="rectangleCable"/>
              <div className="grid2x2">
                    <div>
                    <ReactSVG
                    afterInjection={(error, svg) => {
                      if (error) {
                        console.error(error)
                        return
                      }
                      console.log(svg)
                    }}
                    beforeInjection={(svg) => {
                      svg.classList.add('svg-class-name')
                      svg.setAttribute('style', 'width: 300')
                     
                    }}
                    evalScripts="always"
                    fallback={() => <span>Error!</span>}
                    loading={() => <span>Loading</span>}
                    onClick={() => {
                      console.log('wrapper onClick')
                    }}
                    renumerateIRIElements={false}
                    src={EnergySVG}
                    useRequestCache={false}
                    wrapper="div"/>
                   </div>
                   <div>
                    <ReactSVG
                    afterInjection={(error, svg) => {
                      if (error) {
                        console.error(error)
                        return
                      }
                      console.log(svg)
                    }}
                    beforeInjection={(svg) => {
                      svg.classList.add('svg-class-name')
                      svg.setAttribute('style', 'width: 300')
                   
                    }}
                    evalScripts="always"
                    fallback={() => <span>Error!</span>}
                    loading={() => <span>Loading</span>}
                    onClick={() => {
                      console.log('wrapper onClick')
                    }}
                    renumerateIRIElements={false}
                    src={EnergySVG}
                    useRequestCache={false}
                    wrapper="div"/>
                    </div>
                    <div>
                    <ReactSVG
                    afterInjection={(error, svg) => {
                      if (error) {
                        console.error(error)
                        return
                      }
                      console.log(svg)
                    }}
                    beforeInjection={(svg) => {
                      svg.classList.add('svg-class-name')
                      svg.setAttribute('style', 'width: 300')
                      
                    }}
                    evalScripts="always"
                    fallback={() => <span>Error!</span>}
                    loading={() => <span>Loading</span>}
                    onClick={() => {
                      console.log('wrapper onClick')
                    }}
                    renumerateIRIElements={false}
                    src={EnergySVG}
                    useRequestCache={false}
                    wrapper="div"/>
                   </div>
                   <div>
                    <ReactSVG
                    afterInjection={(error, svg) => {
                      if (error) {
                        console.error(error)
                        return
                      }
                      console.log(svg)
                    }}
                    beforeInjection={(svg) => {
                      svg.classList.add('svg-class-name')
                      svg.setAttribute('style', 'width: 300')
                      
                    }}
                    evalScripts="always"
                    fallback={() => <span>Error!</span>}
                    loading={() => <span>Loading</span>}
                    onClick={() => {
                      console.log('wrapper onClick')
                    }}
                    renumerateIRIElements={false}
                    src={EnergySVG}
                    useRequestCache={false}
                    wrapper="div"/>
                    </div>
              
               
              </div>
              </div>
              </div>
           
      
     
    );
  }
}

export default Menu;
