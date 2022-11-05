export const useServicesOfferingProps = () => {
  const joinTwoArrays = (arr1, arr2) => {
    if (arr1 === undefined || arr2 === undefined) {
      return;
    }
    if (arr1.length < 1) {
      return arr2;
    } else if (arr2.length < 1) {
      return arr1;
    } else return arr1?.concat(arr2);
  };

  const isObjectEmpty = dataPassed => {
    if (dataPassed) {
      if (dataPassed.hasOwnProperty('view')) {
        if (dataPassed.view.hasOwnProperty('statusLine')) {
          return true;
        }
      }
    }
    return false;
  };

  const isDiscountEmpty = dataPassed => {
    if (dataPassed) {
      if (dataPassed.hasOwnProperty('hightlight')) {
        return true;
      }
      console.log('not found');
    }
    return false;
  };
  // const {}

  return {joinTwoArrays, isObjectEmpty, isDiscountEmpty};
};
