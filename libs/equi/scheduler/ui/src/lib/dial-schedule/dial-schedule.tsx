import {
  appliances,
  useDialSchedule,
} from '@virtue-equi/equi/scheduler/feature/appliance-state';
import {
  DeviceType,
  getDeviceIcon,
} from '@virtue-equi/equi/shared/utils/helper';

export function DialSchedule() {
  const { angle, activeId } = useDialSchedule();
  const dialAppear = angle !== 0;

  return (
    <>
      <g
        transform={
          dialAppear ? `rotate(${angle} 540 540)` : 'rotate(0 540 540)'
        }
      >
        {Array.from(Array(5)).map((_, i) => (
          <g
            key={i}
            transform={`translate(${
              angle > 180 && angle < 270 ? '465' : '470'
            }, ${i * 66})`}
          >
            <image
              href={getDeviceIcon(
                `${activeId === i ? 'Add' : 'Blur'}${
                  appliances[i]
                }` as DeviceType
              )}
              width={50}
              height={50}
              transform={
                dialAppear ? `rotate(${-1 * angle} 30 30)` : 'rotate(0)'
              }
            />
          </g>
        ))}
      </g>
      <line
        id="line1"
        x1="540"
        x2="1080"
        y1="540"
        y2="540"
        mask="url(#mask0)"
        stroke="white"
        transform={`rotate(${angle - 90} 540 540)`}
        strokeWidth="10"
      />
    </>
  );
}

export default DialSchedule;
