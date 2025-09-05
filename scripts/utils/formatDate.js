import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

//Function: get todays date based on delivery-option
export function formatDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  //it will enter into the loop, because, remainingDays are always greater than 0
  while (remainingDays > 0) {
    //Add → to move the calendar date forward
    deliveryDate = deliveryDate.add(1, 'day');

    /*
    isWeekend(deliveryDate) means: “Is this day Saturday or Sunday?”

    If yes → it’s the weekend → isWeekend() gives true.

    If no → it’s a weekday → isWeekend() gives false.

    But notice the ! (that’s a “not” sign).

    !true becomes false
    When it becomes false
    It becomes false on Saturday and Sunday.
    Because those are weekends.
    So the code inside does not run, and we don’t subtract.

    !false becomes true
    When it becomes true
    It becomes true on Monday, Tuesday, Wednesday, Thursday, Friday.
    Because those are not weekends.
    So the code inside runs, and we subtract 1 from remainingDays.

    So the if really means:
    “If `today is NOT a weekend, then do this stuff.”
    */

    if (!isWeekend(deliveryDate)) {
      remainingDays = remainingDays - 1;
    }
  }
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}

//check if the day is weekend or not
function isWeekend(date) {
  const daysOfWeek = date.format('dddd');
  return daysOfWeek === 'Saturday' || daysOfWeek === 'Sunday';
}