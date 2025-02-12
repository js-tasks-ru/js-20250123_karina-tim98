/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  

  const splitPath = path.split('.');
   
  return function(obj) {

    if (Object.keys(obj).length < 1) {
      return; 
    }
    let returnValue; 
    for (let i of splitPath) {
      if (typeof obj[i] === 'object' && obj[i] !== null) {
        obj = {...obj[i]};
      }
      else {
        returnValue = obj[i];
      }
    }
    return returnValue;
  };
}
