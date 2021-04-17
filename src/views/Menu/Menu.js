import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MenuItem1 from "./components/MenuItem1";
import MenuItem2 from "./components/MenuItem2";
import MenuItem3 from "./components/MenuItem3";
import MenuItem4 from "./components/MenuItem4";

const Menu = () => {
  const [active, setActive] = useState(0);
  const history = useHistory();

  const handleActive = (id) => () => {
    setActive(id === active ? 0 : id);

    switch (id) {
      case 3:
        history.push("/scheduling");
        break;
      default:
        break;
    }
  };

  return (
    <g>
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M540 170.5C482.991 170.5 428.989 183.376 380.744 206.378C376.194 199.125 370.93 192.367 365.049 186.201C417.794 160.143 477.187 145.5 540 145.5V170.5ZM185.86 364.722C192.004 370.626 198.743 375.916 205.978 380.492C182.6 429.054 169.5 483.497 169.5 541C169.5 598.201 182.463 652.374 205.61 700.742C198.382 705.348 191.654 710.668 185.524 716.602C159.264 663.694 144.5 604.071 144.5 541C144.5 477.66 159.39 417.798 185.86 364.722ZM364.398 895.476C417.306 921.736 476.929 936.5 540 936.5C604.149 936.5 664.731 921.227 718.308 894.12C712.494 887.934 707.295 881.163 702.81 873.904C653.669 897.982 598.413 911.5 540 911.5C482.799 911.5 428.626 898.537 380.258 875.39C375.652 882.618 370.332 889.346 364.398 895.476ZM935.5 541C935.5 603.052 921.21 661.766 895.741 714.031C889.471 708.31 882.624 703.211 875.297 698.833C897.876 650.95 910.5 597.449 910.5 541C910.5 484.247 897.74 430.47 874.929 382.386C882.263 378.037 889.119 372.969 895.401 367.278C921.081 419.713 935.5 478.671 935.5 541Z"
        fill="white"
      />

      <MenuItem1 active={active === 1} onClick={handleActive(1)} />
      <MenuItem2 active={active === 2} onClick={handleActive(2)} />
      <MenuItem3 active={active === 3} onClick={handleActive(3)} />
      <MenuItem4 active={active === 4} onClick={handleActive(4)} />
    </g>
  );
};

export default Menu;
