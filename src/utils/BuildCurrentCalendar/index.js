
const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
}

export const getDaysArray = (date) => {
  const currentMonth = date.getMonth() + 1;

  const daysOfCurrentMonth = getDaysInMonth(
    currentMonth,
    date.getFullYear()
  );

  const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const placeholderDays = [];

  const getFirstInactiveDays = () => {
    const lastMonthDays = getDaysInMonth(
      currentMonth - 1,
      date.getFullYear()
    );

    const lastMonthDaysRequired = [];

    for (
      let i = lastMonthDays;
      i > lastMonthDays - firstDayOfCurrentMonth.getDay();
      i--
    ) {
      lastMonthDaysRequired.push({ day: i, active: false });
    }
    placeholderDays.push(...lastMonthDaysRequired.reverse());
  }

  if (firstDayOfCurrentMonth) {
    getFirstInactiveDays();
  };

  for (let i = 0; i < daysOfCurrentMonth; i++) {
    placeholderDays.push({
      id: `${new Date(
        date.getFullYear(),
        date.getMonth(),
        i + 1
      ).toDateString()}`,
      day: i + 1,
      active: true,
    });
  }

  for (let i = 1; i < 7 - firstDayOfCurrentMonth.getDay() - 1; i++) {
    placeholderDays.push({ day: i, active: false });
  }

  return placeholderDays;
};
export default getDaysArray;
