import numberSeparated from './number-separated';
/**
  * Format values according to type e.g. for display in axis and graph labels
  *
  * @param {number} value the number to formatValue
  * @param {string} type the type on of: percentage, absolute
  * @param {bool} [inThousands=false] if value should be shortened to thousands, appending 'k'
  * @return {string} formatted number
  */
export default function formatValue(value, type, inThousands = false) {
  switch (type) {
    case 'percentage' :
      // percentage rounded to 1 decimal
      return `${Math.round(value * 10) / 10}%`;
    case 'absolute' :
      if (inThousands) {
        // value in thousands
        return value === 0 ? value : `${numberSeparated(Math.round(value / 1000))}k`;
      }
      // value with thousands separator
      return numberSeparated(value);
    default:
      return value;
  }
}
