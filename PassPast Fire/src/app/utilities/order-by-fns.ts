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

export function orderByDate<T>(array: T[], accessor: (T) => Date) {
  return array.sort((a, b) => accessor(b).getTime() - accessor(a).getTime());
}


