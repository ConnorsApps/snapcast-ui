import './App.css';
import { Home } from './Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fafafa'
    },
    secondary: {
      main: '#26c6da',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>);
}

export default App;
