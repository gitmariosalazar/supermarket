export const formatDate = (date: Date | string): string => {
  let d: Date;
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number);
    d = new Date(year, month - 1, day);
  } else {
    d = date;
  }
  return d.toLocaleDateString();
};
