export const deviceTypeToIcon = (device: string) => {
  switch (device) {
    case "Dishwasher":
      return "DishWasherIcon";
    case "Washing Machine":
      return "WashingMachineIcon";
    default:
      throw new Error("Unknown device type");
  }
};

export const dateToAngle = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return ((date.getHours() * 60 + date.getMinutes()) * 360) / 1440;
};

export const angleToTime = (angle: number, active = false) => {
  if (active) {
    const t = (angle * 24 * 60) / 360;
    const hour = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const min = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return hour + ":" + min;
  }
  var now = new Date("04 Dec 1995 01:12:00 GMT");
  return (
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0")
  );
};

export const TimePrettier = (time: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return time.toLocaleTimeString(navigator.language, options);
};
