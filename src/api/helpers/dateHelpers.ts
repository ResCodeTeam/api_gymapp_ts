/**
 * Permite alterar o fuso horario de uma data
 * @param date data
 */
export function changeTimeZone(date: Date) {
  let offset = -(date.getTimezoneOffset() / 60);

  date.setHours(date.getHours() + offset);

}