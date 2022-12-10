import './Home.scss';
import background from './assets/josiah-gardner-ksi5l4iJBjM-unsplash.jpg';
import Loader from './components/Loader/Loader';
import { useContext } from 'react';
import { AppBar, Button, Paper, Toolbar } from '@mui/material';
import Group from './components/Group/Group';
import { AppContext, WEBSOCKET_STATUS } from './utils/AppContext';

const title = process.env.REACT_APP_HOME_TITLE;

const Home = () => {
    const { groups, failed, isLoading } = useContext(AppContext);
    const groupList = Object.values(groups ?? {});

    return (
        <div
            className='home'
            style={{ backgroundImage: `url(${background})` }}
        >
            <AppBar position="static">
                <Toolbar variant="regular">
                    <h1> {title ?? 'Snapcast Audio'} </h1>
                </Toolbar>
            </AppBar>
            <div className='groups'>
                {groupList.map((group, i) =>
                    <Group
                        key={i}
                        group={group}
                    />
                )}
            </div>
            <Loader isLoading={isLoading} />
            {failed && (
                <div className='errorConnecting'>
                    <Paper className='message'>
                        <p>Failed to connect to audio system</p>
                    </Paper>
                    <Button
                        variant="contained"
                        color="secondary"
                        className='button'
                        onClick={() => window.location.reload()}
                    >
                        Reconnect
                    </Button>
                </div>
            )}
        </div>
    )
};
export default Home;