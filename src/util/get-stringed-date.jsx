/**
 * @function getStringedDate
 * Converts Date object into a string formatted as 'YYYY-MM-DD'.
 *
 * @param {Date} targetDate
 * @returns {string}
 */
export const getStringedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

/**
 * ADD 2025-04-18 : formatDisplayDate for short display-style date formatting
 * @function formatDisplayDate
 * Formats a Date object into a short, human-readable string for UI display. (e.g. "Jan 1, 2025")
 *
 * @param {Date} targetDate - The date to format
 * @returns {string} Formatted date string in "MMM D, YYYY" format
 */
export const formatDisplayDate = (targetDate) => {
  return targetDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
