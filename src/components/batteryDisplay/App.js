import '../../App.css';
import React from 'react';
import { ReactSVG } from 'react-svg';
import background from '../../svg/Background.svg';

function App() {
  return (
    <div className="equi">
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
          svg.setAttribute('style', 'width: 950')
        }}
        className="background"
        evalScripts="always"
        fallback={() => <span>Error!</span>}
        loading={() => <span>Loading</span>}
        onClick={() => {
          console.log('wrapper onClick')
        }}
        renumerateIRIElements={false}
        src={background}
        useRequestCache={false}
        wrapper="div"/>
    </div>
  );
}

export default App;
