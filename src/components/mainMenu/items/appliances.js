import { React, useState } from "react";
import { ReactSVG } from 'react-svg';
import ApliancesSVG from '../../../svg/Appliances/Appliances.svg';
import ApliancesFull from '../../../svg/Appliances/AppliancesSelected.svg';


const ApliancesIcon = () => {
    let icons = [ApliancesSVG,ApliancesFull];
    const [j, changeIcon] = useState(0);

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
                src={icons[j]}
                onClick={()=>changeIcon(j^1)}
                useRequestCache={false}
                wrapper='div'/>
        );
}

export default ApliancesIcon;