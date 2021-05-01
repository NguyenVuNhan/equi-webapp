export const appliances = Array.apply(null, Array(10)).map(() => ({
  power_consumption: Math.floor(Math.random() * 1023),
  device_type: "Dishwasher",
  size: Math.random() * 60 + 60,
}));
