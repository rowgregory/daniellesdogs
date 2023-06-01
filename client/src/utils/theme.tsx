export const base = {
  breakpoints: [36, 48, 62, 75, 88, 100].map((n) => n + 'rem'),
};

export const colors = {
  night: {
    colors: {
      primary: '',
      secondary: '',
      tertiary: '',
      quaternary: '',
      quinary: '',
      senary: '',
    },
  },
  day: {
    colors: {
      primary: '#ffc7c7',
      secondary: '#aaaaaa',
      tertiary: '#ffe2e2',
      quaternary: '#f6f6f6',
      quinary: '',
      senary: '',
    },
  },
};

export const themes = {
  light: {
    ...base,
    ...colors.day,
    mode: 'day',
    loading: {
      one: '#eee',
      two: '#ddd',
    },
    bg: '#f6f6f6',
    secondaryBg: '#fff',
    border: '#ccc',
    logo: {
      hover: {
        color: '#b558b5',
      },
    },
    white: '#fff',
  },
  dark: {
    ...base,
    ...colors.night,
    mode: 'night',
    loading: {
      one: '#161b23',
      two: '#10131a',
    },
    bg: '#121212',
    secondaryBg: '',
    border: '#ccc',
    logo: {
      hover: {
        color: '#b558b5',
      },
    },
    white: '#fff',
  },
} as any;
