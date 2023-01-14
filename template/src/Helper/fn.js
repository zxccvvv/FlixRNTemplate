export const currency = function (price) {
  return 'Rp. ' + price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};
