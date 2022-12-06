import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './Home';
import { AppContextProvider } from './utils/AppContext';

const theme = createTheme({
  typography: {
    fontFamily: "Space Grotesk"
  },
  palette: {
    primary: {
      main: '#fafafa'
    },
    secondary: {
      main: '#26c6da',
    },
  },
});

const App = () => (
  <AppContextProvider>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </AppContextProvider>
);

export default App;
