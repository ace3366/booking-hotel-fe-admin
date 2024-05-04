export function dateCount(startDate, endDate) {
  return (endDate - startDate) / 86400000 + 1;
}
