export const formatCentsToCurrency = (cents: number): string => {
  return `${cents.toString().substring(0, cents.toString().length - 2)},${cents.toString().substring(cents.toString().length - 2)}`
}