import {
  buttonClicked$,
  useDialAngle,
} from '@virtue-equi/equi-shared-features';
import {
  ApplianceButton,
  CloseButton,
  ScheduleButton,
} from '@virtue-equi/equi/menu/ui';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/* eslint-disable-next-line */
export interface EquiMenuFeatureProps {}

export function Menu(props: EquiMenuFeatureProps) {
  const [active, setActive] = useState(0);
  const history = useHistory();
  const dialPosition = useDialAngle();

  useEffect(() => {
    const clickedSubscriber = buttonClicked$.subscribe(() => {
      switch (active) {
        case 2:
          history.push('/scheduling');
          break;
        case 3:
          history.push('/appliances');
          break;
        case 4:
          history.push('/standby');
          break;
      }
    });
    return () => {
      clickedSubscriber.unsubscribe();
    };
  }, [active, history]);

  useEffect(() => {
    const pos = (dialPosition * 4) % 360;
    if (pos > 305) setActive(1);
    else if (pos > 215) setActive(2);
    else if (pos > 125) setActive(3);
    else setActive(4);
  }, [dialPosition]);

  return (
    <g>
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M203.662 419.951C253.428 282.063 385.454 183.5 540.5 183.5V158.5C373.151 158.5 230.871 265.83 178.74 415.409C187.317 416.096 195.653 417.638 203.662 419.951ZM203.662 663.049C195.653 665.362 187.317 666.904 178.74 667.591C217.153 777.808 304.511 865.086 414.778 903.388C415.722 894.887 417.508 886.64 420.051 878.733C319.594 842.849 239.864 763.354 203.662 663.049ZM902.288 667.51C863.89 777.765 776.516 865.076 666.222 903.388C665.278 894.887 663.492 886.64 660.949 878.733C761.494 842.818 841.276 763.214 877.433 662.784C885.417 665.155 893.73 666.758 902.288 667.51Z"
        fill="#C4C4C4"
      />

      <ScheduleButton active={active === 2} />
      <ApplianceButton active={active === 3} />
      <CloseButton active={active === 4} />
    </g>
  );
}

export default Menu;
