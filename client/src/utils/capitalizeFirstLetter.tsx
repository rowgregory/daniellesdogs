export const capitalizeFirstLetter = (str: string) => {
  return (
    str.charAt(0).toUpperCase() +
    str
      .slice(1)
      .replace(/([A-Z])/g, ' $1')
      .trim()
  );
};
