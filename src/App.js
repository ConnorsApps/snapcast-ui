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
  <ThemeProvider theme={theme}>
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  </ThemeProvider>
);

export default App;
