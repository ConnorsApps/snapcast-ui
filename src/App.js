import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './Home';
import { AppContextProvider } from './utils/AppContext';

const theme = createTheme({
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

const App = () => (
  <AppContextProvider>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </AppContextProvider>
);

export default App;
