/**
 * The function separates a card number by inserting a space every specified interval.
 * @returns a space character (" ") if the index is greater than 0 and is divisible by the interval,
 * otherwise it returns an empty string ("").
 */
export function separateCardNumber(index, interval) {
  return index > 0 && index % interval === 0 ? " " : "";
}

/**
 * The function hides a portion of a card number by replacing it with "*" characters.
 * @returns "#" if the index is greater than or equal to the start value and less than the end value.
 * Otherwise, it returns the original number.
 */
export function hideCardNumber(index, number, end, start = 0) {
  return index >= start && index < end ? "*" : number;
}
