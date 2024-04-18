export const checkTokenExp = (currentDatetime: number, expires: number) => {
  return currentDatetime >= expires;
};
