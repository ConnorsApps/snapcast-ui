import { useState } from 'react';
import defaultImage from '../../assets/josiah-gardner-ksi5l4iJBjM-unsplash.jpg';
import roseImage from '../../assets/christina-deravedisian-xu2YiLvBj3U-unsplash.jpg';
import recordImage from '../../assets/karl-hornfeldt-i4UcdpKoA9c-unsplash.jpg';
import tropicImage from '../../assets/tobias-tullius-fo7AX02q-eo-unsplash.jpg';
import liveLaughLoveImage from '../../assets/brandi-alexandra-ykYknpMsndk-unsplash.jpg';
import '@fontsource/space-grotesk';
import '@fontsource/sansita';
import '@fontsource/comic-neue';
import { matThemes } from './matThemes';
import { ThemeSelector } from './ThemeSelector';

export const THEME_OPTIONS = [
  'default',
  'roses',
  'tropic',
  '80s',
  'liveLaughLove',
];

const envTheme = process.env.REACT_APP_THEME;

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
    matTheme = matThemes.roseTheme;

  } else if (theme === '80s') {
    backgroundImage = recordImage;
    matTheme = matThemes.eightiesTheme;

  } else if (theme === 'tropic') {
    backgroundImage = tropicImage;
    matTheme = matThemes.tropicTheme;

  } else if (theme === 'liveLaughLove') {
    backgroundImage = liveLaughLoveImage;
    matTheme = matThemes.liveLaughLoveTheme;

  } else {
    backgroundImage = defaultImage;
    matTheme = matThemes.defaultTheme;
    
  }
  setMetaTheme(matTheme.palette.primary.main);

  document.body.style.fontFamily = matTheme.typography.fontFamily;

  return { theme, backgroundImage, matTheme, setTheme, Selector };
};

export default useTheme;