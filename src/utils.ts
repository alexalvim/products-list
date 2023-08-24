export const formatCentsToCurrency = (cents: number): string => {
  return `${cents.toString().substring(0, cents.toString().length - 2)},${cents.toString().substring(cents.toString().length - 2)}`
}

export const formatCurrencyToCents = (price: string): number => {
  if(price.split(',').length > 1) {
    return +price.split(',').join('');
  }
  return +(price + '00'); 
}