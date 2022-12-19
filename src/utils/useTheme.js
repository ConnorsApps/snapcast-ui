import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import defaultImage from '../assets/josiah-gardner-ksi5l4iJBjM-unsplash.jpg';
import roseImage from '../assets/christina-deravedisian-xu2YiLvBj3U-unsplash.jpg';
import recordImage from '../assets/karl-hornfeldt-i4UcdpKoA9c-unsplash.jpg';
import '@fontsource/space-grotesk';
import '@fontsource/pacifico';

const envTheme = process.env.REACT_APP_THEME;
const eightiesTheme = createTheme({
  typography: {
    fontFamily: "Space Grotesk"
  },
  palette: {
    primary: {
      main: '#0C7575',
      contrastText: "#fff"
    },
    secondary: {
      main: '#865954',
    },
  },
});

const roseTheme = createTheme({
  typography: {
    fontFamily: "Changa"
  },
  palette: {
    primary: {
      main: '#F20587',
      contrastText: "#fff"
    },
    secondary: {
      main: '#05F2DB',
    },
  },
});

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Space Grotesk"
  },
  palette: {
    primary: {
      main: '#040E21',
      contrastText: "#fff"
    },
    secondary: {
      main: '#FBBA89',
    },
  },
});

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('SNAPCAST_UI_THEME') || envTheme || 'default');

  let matTheme;
  let backgroundImage;

  const setMetaTheme = (color) =>
    document.querySelector('meta[name=theme-color]')
      .setAttribute('content', color);

  if (theme === 'roses') {
    backgroundImage = roseImage;
    setMetaTheme('#0C7575');
    matTheme = roseTheme;
  } else if (theme === '80s') {
    backgroundImage = recordImage;
    setMetaTheme('#F20587');
    matTheme = eightiesTheme;
  } else {
    backgroundImage = defaultImage;
    setMetaTheme('#040E21');
    matTheme = defaultTheme;
  }
  return { theme, backgroundImage, matTheme, setTheme };
};

export default useTheme;