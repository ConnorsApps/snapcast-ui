import './App.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';
import background from './assets/chirag-saini-wkZ_6jkugYM-unsplash.jpg';

import Stream from './components/Stream/Stream';
import Client from './components/Client/Client';
import Group from './components/Group/Group';

const title = process.env.REACT_APP_HOME_TITLE;

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

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className='app' style={{ backgroundImage: `url(${background})` }}>
        <AppBar position="static">
          <Toolbar variant="regular">
            <h1> {title ?? 'Snapcast Audio'} </h1>
          </Toolbar>
        </AppBar>

        <Group>
          <Stream name='Spotify' />
          <Client />
        </Group>
      </div>
    </ThemeProvider>);
}

export default App;
