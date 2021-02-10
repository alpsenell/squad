/**
 * @param {string} string
 * @param {object} values
 * @return {string}
 */
// eslint-disable-next-line import/prefer-default-export
export function replaceString (string, values) {
  for (const [key, value] of Object.entries(values)) {
    string = string.replace(`{${key}}`, value);
  }

  return string;
}

/**
 * @param {array} arr
 * @return {boolean}
 */
export function isEmptyArray (arr) {
  return arr.length === 0;
}
