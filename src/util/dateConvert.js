export function dateConvert(date) {
  const datePart = date.split("-");
  datePart[2] = datePart[2].split("T");
  datePart[2] = datePart[2][0];
  return `${datePart[2]}/${datePart[1]}/${datePart[0]}`;
}
