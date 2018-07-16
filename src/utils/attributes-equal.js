// comparison of attribute values, force string, check 'null' if unspecified
export default function attributesEqual(testValue, value) {
  return typeof value !== 'undefined'
    && value !== null
    && value.toString() === (
      (typeof testValue === 'undefined' || testValue === null)
        ? 'null'
        : testValue.toString()
    );
}
