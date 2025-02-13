/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (!string.length) {return string;}

  const splitString = string.split('');
  const listStringElements = [];

  listStringElements.push(splitString.reduce((acc, value) => {
    if (acc.includes(value)) {
      acc += value;
    } else {
      listStringElements.push(acc);
      acc = value;
    }
    return acc;
  }));

  return listStringElements.map(value=> value.length > size ? value.slice(0, size) : value).join('');
     
}
