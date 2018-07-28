const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function formatValue(value, type, inThousands = false) {
  switch (type) {
    case 'percentage' :
      return `${value}%`;
    case 'absolute' :
      if (inThousands) {
        return value === 0 ? value : `${value / 1000}k`;
      }
      return numberWithCommas(value);
    default:
      return value;
  }
}
