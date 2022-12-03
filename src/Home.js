
import Loader from './components/Loader/Loader';
import { useContext } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import background from './assets/chirag-saini-wkZ_6jkugYM-unsplash.jpg';

import Stream from './components/Stream/Stream';
import Client from './components/Client/Client';
import Group from './components/Group/Group';
import { AppContext } from './utils/AppContext';

const title = process.env.REACT_APP_HOME_TITLE;

const Home = () => {
    const state = useContext(AppContext);

    return (
        <div
            className='app'
            style={{ backgroundImage: `url(${background})` }}
        >
            <AppBar position="static">
                <Toolbar variant="regular">
                    <h1> {title ?? 'Snapcast Audio'} </h1>
                </Toolbar>
            </AppBar>

            <Group>
                <Stream name='Spotify' />
                <Client />
            </Group>
            
            <Loader isLoading={state.isLoading} />
        </div>)
};
export default Home;