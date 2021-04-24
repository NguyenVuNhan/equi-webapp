export const deviceTypeToIcon = (device) => {
  switch (device) {
    case "Dishwasher":
      return "DishWasherIcon";
    case "Washing Machine":
      return "WashingMachineIcon";
    default:
      throw new Error("Unknown device type");
  }
};

export const dateToAngle = (date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return ((date.getHours() * 60 + date.getMinutes()) * 360) / 1440;
};

export const TimePrettier = (time) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return time.toLocaleTimeString(navigator.language, options);
};

export const getApplianceTimeRange = (appliance) => {
  const from = TimePrettier(appliance.time_start);
  const to = TimePrettier(appliance.time_end);

  return from + " → " + to;
};
