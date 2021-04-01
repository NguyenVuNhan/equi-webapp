import { React, useState } from "react";
import { ReactSVG } from 'react-svg';
import ScheduleSVG from '../../../svg/Schedule/ScheduleIcon.svg';
import ScheduleFull from '../../../svg/Schedule/ScheduleIconSelect.svg';


const ScheduleIcon = () => {
    let icons = [ScheduleSVG,ScheduleFull];
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

export default ScheduleIcon;