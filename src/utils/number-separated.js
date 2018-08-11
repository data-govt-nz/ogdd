/**
  * Format number with thousand separator ','
  * @param {number|string} x a number
  * @return {string} a number with thousand separator
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
const numberSeparated = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default numberSeparated;
