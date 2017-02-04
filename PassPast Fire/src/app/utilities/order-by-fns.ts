export function orderByAlpha<T>(array: T[], fieldName) {
 return array === null ? null :
    array.sort((a, b) => {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
    return 0;
  });
}


export function orderByDate<T>(array: T[], fieldName) {
 return array === null ? null :
    array.sort((a: T, b: T) => {
      const aDate = new Date(a[fieldName]);
      const bDate = new Date(b[fieldName]);
      if (aDate > bDate) {
        return -1;
      }
      if (aDate < bDate) {
        return 1;
      }
      return 0;
    });
}


