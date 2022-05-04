export function changeTimeZone(date: Date) {
  let offset = -(date.getTimezoneOffset() / 60);

  date.setHours(date.getHours() + offset);

}