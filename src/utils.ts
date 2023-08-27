export const formatCentsToCurrency = (cents: number): string => {
  if(cents < 100) {
    if(cents < 10) {
      return `0,0${cents}`
    }
    return `0,${cents}`
  }
  return `${cents.toString().substring(0, cents.toString().length - 2)},${cents.toString().substring(cents.toString().length - 2)}`
}

export const formatCurrencyToCents = (price: string): number => {
  if(price.split(',').length > 1) {
    const splitedPrice = price.split(',');

    if(splitedPrice[1].length === 1) {
      return +(price.split(',').join('') + '0');
    }

    return +(`${splitedPrice[0]}${splitedPrice[1].substring(0,2)}`);
  }
  return +(price + '00'); 
}