export function numberWithCommas(x) {
  // return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return Intl.NumberFormat().format(x);
}
