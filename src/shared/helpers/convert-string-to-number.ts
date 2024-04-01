export const convertStringToNumber = (val: string): number | undefined => {
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};
