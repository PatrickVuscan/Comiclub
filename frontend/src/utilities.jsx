function formatNum(num) {
  /** Return number as formatted string e.g. formatNum(123456789, 2) = '123.46M'
   * @param num the number to format
   * @returns formatted string
   */
  const lookup = [
    { value: 0, symbol: '' },
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const intNum = parseInt(num, 10);
  const item = lookup
    .slice()
    .reverse()
    .find((i) => intNum >= i.value);
  const val = item.value === 0 ? 1 : item.value;
  return (intNum / val).toFixed(0).replace(rx, '$1') + item.symbol;
}

export default function formatMetric(value, name) {
  /** Format a metric: make numbers readable and add "s" if value is not singular
   * @param value: the value of the metric
   * @param name: the name of the metric
   * @returns formatted string
   */
  const safeValue = value || 0;
  return `${formatNum(safeValue)} ${name}${safeValue === 1 ? '' : 's'}`;
}
