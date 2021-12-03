import { useDialAngle } from '@virtue-equi/equi-shared-features';

/* eslint-disable-next-line */
export interface DialScheduleProps {}

export function DialSchedule(props: DialScheduleProps) {
  const dialPosition = useDialAngle();

  return (
    <g>
      <path
        d="M540 1080C521.561 1080 503.134 1079.07 484.789 1077.21C466.791 1075.38 448.896 1072.65 431.171 1069.03C413.779 1065.47 396.371 1060.99 379.421 1055.72C362.676 1050.51 345.983 1044.41 329.808 1037.56C313.79 1030.79 297.908 1023.14 282.608 1014.83C267.419 1006.57 252.439 997.474 238.084 987.776C223.808 978.131 209.821 967.676 196.513 956.69C183.243 945.739 170.341 934.013 158.166 921.837C145.991 909.661 134.266 896.763 123.313 883.49C112.329 870.18 101.87 856.19 92.2271 841.919C82.5271 827.568 73.427 812.589 65.178 797.396C56.864 782.09 49.213 766.208 42.439 750.196C35.601 734.028 29.492 717.336 24.281 700.583C19.012 683.644 14.535 666.232 10.975 648.832C7.35327 631.107 4.6222 613.212 2.79199 595.214C0.933885 576.868 0.00204291 558.44 0 540C0.000838709 521.561 0.931317 503.134 2.78796 484.788C4.61811 466.79 7.34918 448.896 10.9709 431.171C14.5319 413.771 19.009 396.359 24.277 379.42C29.488 362.667 35.5971 345.975 42.4351 329.808C49.2101 313.79 56.861 297.908 65.174 282.608C73.4249 267.418 82.526 252.438 92.223 238.084C101.871 223.803 112.33 209.817 123.309 196.513C134.264 183.239 145.99 170.337 158.162 158.166C170.334 145.995 183.239 134.266 196.509 123.313C209.809 112.335 223.798 101.876 238.08 92.2271C252.427 82.5341 267.407 73.4331 282.604 65.1781C297.904 56.8641 313.789 49.2132 329.804 42.4391C345.973 35.6001 362.665 29.4901 379.417 24.2811C396.363 19.0101 413.774 14.5331 431.167 10.9741C448.892 7.35177 466.787 4.62069 484.785 2.79114C491.118 2.14814 497.585 1.6081 503.996 1.1911V329.024C501.621 329.424 499.223 329.873 496.868 330.355C483.099 333.176 469.644 337.352 456.698 342.824C443.972 348.212 431.798 354.82 420.346 362.555C408.982 370.238 398.377 378.988 388.675 388.686C378.977 398.388 370.227 408.993 362.544 420.357C354.809 431.809 348.202 443.983 342.813 456.708C337.341 469.654 333.164 483.109 330.343 496.878C327.451 511.07 325.996 525.517 326 540C325.996 554.486 327.453 568.935 330.347 583.128C333.168 596.897 337.345 610.353 342.817 623.299C348.206 636.024 354.813 648.198 362.548 659.65C370.231 671.015 378.981 681.62 388.679 691.321C398.381 701.02 408.986 709.77 420.35 717.453C431.801 725.188 443.975 731.796 456.7 737.183C469.646 742.655 483.101 746.832 496.87 749.652C511.064 752.547 525.514 754.003 540 754C554.486 754.003 568.935 752.547 583.129 749.652C596.898 746.832 610.354 742.655 623.3 737.183C636.025 731.795 648.199 725.187 659.65 717.452C671.015 709.769 681.62 701.019 691.322 691.32C701.02 681.618 709.77 671.013 717.453 659.649C725.188 648.198 731.795 636.025 737.184 623.3C742.656 610.354 746.833 596.898 749.654 583.129C752.548 568.935 754.004 554.486 754 540C754.003 525.514 752.547 511.065 749.653 496.871C746.832 483.103 742.655 469.647 737.183 456.701C731.795 443.976 725.187 431.802 717.452 420.35C709.769 408.986 701.019 398.381 691.321 388.679C681.619 378.981 671.014 370.231 659.649 362.548C648.198 354.813 636.025 348.205 623.3 342.817C610.354 337.345 596.899 333.169 583.13 330.348C580.774 329.866 578.376 329.418 576.001 329.017V1.18311C582.426 1.60511 588.89 2.14514 595.213 2.78314C613.211 4.61272 631.106 7.3438 648.83 10.9661C666.23 14.5261 683.643 19.0031 700.581 24.2731C717.334 29.4841 734.026 35.5932 750.194 42.4312C766.213 49.2062 782.094 56.8571 797.394 65.1701C812.585 73.4221 827.565 82.5221 841.917 92.2191C856.199 101.867 870.185 112.326 883.488 123.305C896.765 134.262 909.667 145.988 921.835 158.158C934.003 170.328 945.735 183.234 956.688 196.505C967.67 209.813 978.129 223.8 987.774 238.076C997.467 252.423 1006.57 267.404 1014.82 282.6C1023.14 297.907 1030.79 313.789 1037.56 329.8C1044.4 345.962 1050.51 362.654 1055.72 379.412C1060.99 396.35 1065.47 413.762 1069.03 431.163C1072.65 448.888 1075.38 466.782 1077.21 484.78C1079.07 503.128 1080 521.558 1080 540C1080 558.439 1079.07 576.866 1077.21 595.211C1075.38 613.209 1072.65 631.104 1069.03 648.829C1065.47 666.229 1060.99 683.64 1055.72 700.58C1050.51 717.33 1044.4 734.022 1037.56 750.193C1030.79 766.205 1023.14 782.087 1014.83 797.393C1006.57 812.593 997.468 827.572 987.777 841.916C978.124 856.203 967.665 870.19 956.691 883.487C945.738 896.758 934.011 909.66 921.838 921.834C909.665 934.008 896.766 945.734 883.491 956.687C870.191 967.664 856.204 978.123 841.92 987.773C827.575 997.464 812.595 1006.57 797.397 1014.82C782.09 1023.14 766.208 1030.79 750.197 1037.56C734.023 1044.4 717.33 1050.51 700.584 1055.72C683.636 1060.99 666.225 1065.47 648.833 1069.03C631.109 1072.65 613.214 1075.38 595.216 1077.21C576.869 1079.07 558.441 1080 540 1080Z"
        fill="black"
        opacity="0.0"
        filter="url(#blurMe)"
      />

      <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </g>
  );
}

export default DialSchedule;
