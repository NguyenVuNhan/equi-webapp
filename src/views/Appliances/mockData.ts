export const appliances: Appliance[] = Array(10)
  .fill(new Date())
  .map(() => ({
    power_consumption: Math.floor(Math.random() * 1023),
    time_start: new Date(),
    time_end: new Date(),
    device_type: "Dishwasher",
    size: Math.random() * 60 + 60,
  }));
