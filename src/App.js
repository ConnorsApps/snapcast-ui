import { ThemeProvider } from '@mui/material/styles';
import Home from './Home';
import { AppContextProvider } from './utils/AppContext';
import useTheme from './utils/useTheme';


const App = () => {
  const { backgroundImage, matTheme } = useTheme();

  return (
    <AppContextProvider>
      <ThemeProvider theme={matTheme}>
        <Home backgroundImage={backgroundImage} />
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
