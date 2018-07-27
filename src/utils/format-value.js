export default function formatValue(value, type) {
  switch (type) {
    case 'percentage' :
      return `${value}%`;
    default:
      return value;
  }
}
