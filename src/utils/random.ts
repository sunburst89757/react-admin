export const randomData = (min: number = 0, max: number = 1) => {
  return min + Math.floor((max - min) * Math.random());
};
