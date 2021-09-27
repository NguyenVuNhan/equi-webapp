export const digitFormat = (time: number): string => {
  return time.toString().padStart(2, '0');
};

export function getCurrentTime() {
  const now = new Date();
  return digitFormat(now.getHours()) + ':' + digitFormat(now.getMinutes());
}
