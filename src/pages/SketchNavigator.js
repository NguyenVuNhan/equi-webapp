import React, { Component, useEffect } from "react";
import P5Wrapper from "react-p5-wrapper";
import equi from "./Scripts/equi";

class SketchNavigator extends Component{
    render(){
        return (
        <div>
            <P5Wrapper sketch={equi}/>
        </div>
      );
    }
}


export default SketchNavigator;
