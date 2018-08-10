/**
  * Quasi-equality test of 2 values, allowing comparing numbers and strings
  *
  * @param {number|string} testValue the value to test
  * @param {number|string} value the value to test against
  * @return {boolean} if values are quasi equal
  *
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default function attributesEqual(testValue, value) {
  if (typeof value === 'undefined' || typeof testValue === 'undefined') {
    return undefined;
  }
  if (testValue === null) {
    return value === null || value === 'null';
  }
  if (value === null) {
    return testValue === null || testValue === 'null';
  }
  return value.toString() === testValue.toString();
}
