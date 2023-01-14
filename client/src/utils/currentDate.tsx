export const currentDate = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1 <= 9
    ? '0' + (new Date().getMonth() + 1).toString()
    : new Date().getMonth() + 1
}-${String(new Date().getDate()).padStart(2, '0')}`;
