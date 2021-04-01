import { React, useState } from "react";
import { ReactSVG } from 'react-svg';
import EnergySVG from '../../../svg/Energy/Energy.svg';
import EnergyFull from '../../../svg/Energy/Energy-Fill.svg';


const EnergyIcon = () => {
    let icons = [EnergySVG,EnergyFull];
    const [i, changeIcon] = useState(0);

        return(
        <ReactSVG
                beforeInjection={(svg) => {
                        svg.classList.add('svg-class-name')
                        svg.setAttribute('style', 'width: 400px')

                }}
                evalScripts="always"
                fallback={() => <span>Error!</span>}
                loading={() => <span>Loading</span>}
                renumerateIRIElements={false}
                src={icons[i]}
                onClick={()=>changeIcon(i^1)}
                useRequestCache={false}
                wrapper='div'/>
        );
}

export default EnergyIcon;