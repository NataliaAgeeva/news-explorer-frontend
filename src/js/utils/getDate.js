export default function formatDate() {
  const WEEK = 604800000;
  const sevenDaysBefore = new Date() - WEEK;

  const formattedDate = new Date(sevenDaysBefore).toJSON().split('T');

  return formattedDate[0];
}
