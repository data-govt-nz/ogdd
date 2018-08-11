/**
  * calculate maximum y axis value based on maximum data value
  * axis should have a relative buffer of 2+ according (relative to order of magnitude)
  * @param {number} maximum y axis value
  */
const getYAxisMax = (yMax) => {
  // order of magnitude
  const order = Math.floor((Math.log(yMax) / Math.LN10) + 0.000000001);
  // order of magnitude factor
  const factor = 10 ** order;
  // relative buffer of 2+
  return ((2 * Math.ceil(Math.floor(yMax / factor) / 2)) + 2) * factor;
};
export default getYAxisMax;
