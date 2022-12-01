import './Home.css';
import { AppBar, Paper, Toolbar, Typography } from '@mui/material';
import background from './assets/chirag-saini-wkZ_6jkugYM-unsplash.jpg';

const title = process.env.REACT_APP_HOME_TITLE;

export const Home = () => {

    return <div className='home' style={{ backgroundImage: `url(${background})` }}>
        <AppBar position="static">
            <Toolbar variant="regular">
                <Typography variant="h6" color="inherit" component="div">
                    {title ?? 'Snapcast Audio'}
                </Typography>
            </Toolbar>
        </AppBar>

        <Paper className='group' elevation={3}>
            paper
        </Paper>
    </div>
}