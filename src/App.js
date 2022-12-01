import './App.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Paper, Slider, Toolbar, Typography } from '@mui/material';
import background from './assets/chirag-saini-wkZ_6jkugYM-unsplash.jpg';
import { useState } from 'react';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { IoVolumeMute, IoVolumeLow, IoVolumeMedium, IoVolumeHigh } from 'react-icons/io5'

const title = process.env.REACT_APP_HOME_TITLE;

const VolumeIcon = ({ volume }) => {
  if (volume === 0) {
    return <IoVolumeMute />;
  } else if (volume < 30) {
    return <IoVolumeLow />;
  } else if (volume < 60) {
    return <IoVolumeMedium />;
  } else {
    return <IoVolumeHigh />;
  }
}

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
  const handleChange = (_, newValue) => setSlider(newValue);

  const [slider, setSlider] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div className='app' style={{ backgroundImage: `url(${background})` }}>
        <AppBar position="static">
          <Toolbar variant="regular">
            <Typography variant="h6">
              {title ?? 'Snapcast Audio'}
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper className='group' elevation={3}>
          <div className='stream'>
            <Typography variant="p">
              Spotify
            </Typography>

            <div className='volume'>
              <VolumeIcon volume={slider} /> <Slider value={slider} onChange={handleChange} />
            </div>
          </div>

          <Paper className='client'>
            <div className='title'>
              <BsFillSpeakerFill />
              <Typography variant="p">
                Outside
              </Typography>

            </div>
            <Slider color="secondary" value={50} elevation={0} />
          </Paper>
        </Paper>
      </div>
    </ThemeProvider>);
}

export default App;
