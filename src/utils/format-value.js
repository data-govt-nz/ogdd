/**
  * Format number with thousand separator ','
  * @param {number|string} x a number
  * @return {string} a number with thousand separator
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
  * Format values according to type e.g. for display in axis and graph labels
  *
  * @param {number} value the number to formatValue
  * @param {string} type the type on of: percentage, absolute
  * @param {bool} [inThousands=false] if value should be shortened to thousands, appending 'k'
  * @return {string} formatted number
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default function formatValue(value, type, inThousands = false) {
  switch (type) {
    case 'percentage' :
      // percentage rounded to 1 decimal
      return `${Math.round(value * 10) / 10}%`;
    case 'absolute' :
      if (inThousands) {
        // value in thousands
        return value === 0 ? value : `${numberWithCommas(Math.round(value / 1000))}k`;
      }
      // value with thousands separator
      return numberWithCommas(value);
    default:
      return value;
  }
}
