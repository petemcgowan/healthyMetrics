const selectionDropDownRange = function (
  startNumber: number,
  endNumber: number,
) {
  const numbers = [];
  // startNumber = startNumber || 80;
  while (startNumber <= endNumber) {
    numbers.push({
      label: startNumber.toString(),
      value: startNumber.toString(),
    });
    startNumber++;
  }
  return numbers;
};

const yearsRange = function (startYear) {
  const currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    startYear++;
    years.push({label: startYear.toString(), value: startYear.toString()});
  }
  return years;
};

export default {selectionDropDownRange, yearsRange};
