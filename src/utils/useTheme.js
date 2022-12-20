import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import defaultImage from '../assets/josiah-gardner-ksi5l4iJBjM-unsplash.jpg';
import roseImage from '../assets/christina-deravedisian-xu2YiLvBj3U-unsplash.jpg';
import recordImage from '../assets/karl-hornfeldt-i4UcdpKoA9c-unsplash.jpg';
import tropicImage from '../assets/tobias-tullius-fo7AX02q-eo-unsplash.jpg';
import liveLaughLoveImage from '../assets/brandi-alexandra-ykYknpMsndk-unsplash.jpg';
import '@fontsource/space-grotesk';
import '@fontsource/sansita';
import '@fontsource/comic-neue';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const THEME_OPTIONS = [
  'default',
  'roses',
  'tropic',
  '80s',
  'liveLaughLove',
];

const envTheme = process.env.REACT_APP_THEME;

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Space Grotesk'
  },
  palette: {
    primary: {
      main: '#040E21',
      contrastText: "#fff",
    },
    secondary: {
      main: '#FBBA89',
    },
  },
});
const roseTheme = createTheme({
  typography: {
    fontFamily: 'Sansita'
  },
  palette: {
    primary: {
      main: '#0C7575',
      contrastText: "#fff"
    },
    secondary: {
      main: '#D08858',
    },
  },
});
const eightiesTheme = createTheme({
  typography: {
    fontFamily: 'Sansita'
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
const tropicTheme = createTheme({
  typography: {
    fontFamily: 'Changa'
  },
  palette: {
    primary: {
      main: '#183940',
      contrastText: "#fff"
    },
    secondary: {
      main: '#D99E89',
    },
  },
});
const liveLaughLoveTheme = createTheme({
  typography: {
    fontFamily: 'Comic Neue'
  },
  palette: {
    primary: {
      main: '#57451C',
      contrastText: "#fff",
    },
    secondary: {
      main: '#F400F4',
    },
  },
});

const ThemeSelector = ({ theme, setTheme, className }) => {
  const onSelect = (event) => {
    const selectedTheme = event.target.value;
    localStorage.setItem('SNAPCAST_UI_THEME', selectedTheme);
    setTheme(selectedTheme);
  }
  return (
    <FormControl className={className}>
      <InputLabel sx={{ color: 'white' }} id='theme-selector-label'>Theme</InputLabel>
      <Select
        labelId='theme-selector-label'
        className='selectBox'
        value={theme}
        label='Theme'
        sx={{
          color: 'white',
          textTransform: 'capitalize',
          minWidth: '30vw',
          padding: '0',
          margin:'0',
        }}
        variant='filled'
        onChange={onSelect}
      >
        {THEME_OPTIONS.map((t, i) => (
          <MenuItem
            key={i}
            value={t}
            sx={{ textTransform: 'capitalize' }}
          >{t}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('SNAPCAST_UI_THEME') || envTheme || 'default');

  const Selector = ({ className }) => ThemeSelector({ theme, setTheme, className });

  let matTheme;
  let backgroundImage;

  const setMetaTheme = (color) =>
    document.querySelector('meta[name=theme-color]')
      .setAttribute('content', color);
  
  if (theme === 'roses') {
    backgroundImage = roseImage;
    matTheme = roseTheme;
  } else if (theme === '80s') {
    backgroundImage = recordImage;
    matTheme = eightiesTheme;
  } else if (theme === 'tropic') {
    backgroundImage = tropicImage;
    matTheme = tropicTheme;
  } else if (theme === 'liveLaughLove') {
    backgroundImage = liveLaughLoveImage;
    matTheme = liveLaughLoveTheme;
  } else {
    backgroundImage = defaultImage;
    matTheme = defaultTheme;
  }
  setMetaTheme(matTheme.palette.primary.main);

  document.body.style.fontFamily = matTheme.typography.fontFamily;

  return { theme, backgroundImage, matTheme, setTheme, Selector };
};

export default useTheme;