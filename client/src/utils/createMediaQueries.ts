const breakpoints: any = [36, 48, 62, 75, 88, 100];

export const createMediaQueries = (css: any) => {
  const cssKeyValuePairs = css.reduce((items: any, item: any) => {
    const { property, values } = item;

    items.push(
      Array.isArray(item.values)
        ? values.map((value: any) => ({
            [property]: value,
          }))
        : [{ [property]: values }]
    );
    return items;
  }, []);

  const cssToBreakpoints: any = [0, ...breakpoints]
    .map((breakpoint, index) => ({
      breakpoint: breakpoint,
      css: cssKeyValuePairs
        .map((array: any) => array[index])
        .filter(Boolean)
        .reduce((items: any, item: any) => {
          items[`${Object.keys(item)}`] = `${Object.values(item)}`;
          return items;
        }, {}),
    }))
    .slice(0, -1);

  const cssMediaQueries = cssToBreakpoints.reduce((items: any, item: any) => {
    const { breakpoint, css } = item;

    breakpoint
      ? (items[`@media screen and (min-width: ${breakpoint}rem)`] = {
          ...css,
        })
      : (items = { ...css });

    return items;
  }, {});

  return {
    ...cssMediaQueries,
  };
};
