import { ThemeProvider } from '@mui/material/styles';
import Home from './Home';
import { AppContextProvider } from './utils/AppContext';
import useTheme from './utils/useTheme/useTheme';


const App = () => {
  const theme = useTheme();
  
  return (
    <AppContextProvider theme={theme}>
      <ThemeProvider theme={theme.matTheme}>
        <Home />
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
