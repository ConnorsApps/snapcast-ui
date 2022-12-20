import './Home.scss';
import Loader from './components/Loader/Loader';
import { useContext, useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { AppContext } from './utils/AppContext';
import { IoSettingsOutline, IoHomeOutline } from 'react-icons/io5';
import Groups from './pages/Groups/Groups';
import ErrorConnecting from './components/ErrorConnecting/ErrorConnecting';
import Settings from './pages/Settings/Settings';
import { WEBSOCKET_STATUS } from './utils/WebSocket';

const title = process.env.REACT_APP_HOME_TITLE;

const Home = () => {
    const { webSocketStatus, isLoading, theme } = useContext(AppContext);
    const [page, setPage] = useState('groups');

    return (
        <div
            className='home'
            style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        >
            <AppBar className='appBar' position="static">
                <Toolbar variant="regular">
                    <h1> {title ?? 'Snapcast Audio'} </h1>
                    <div className='rightOptions'>
                        {page === 'settings' && <theme.Selector
                            className='themeSelector'
                        />}
                        <button
                            className='togglePage'
                            onClick={() => setPage(page === 'groups' ? 'settings' : 'groups')}
                        >
                            {page === 'groups' && <IoSettingsOutline />}
                            {page === 'settings' && <IoHomeOutline />}
                        </button>
                    </div>
                </Toolbar>
            </AppBar>
            {page === 'groups' && <Groups />}
            {page === 'settings' && <Settings />}

            <Loader isLoading={isLoading} />
            {webSocketStatus === WEBSOCKET_STATUS.failed && <ErrorConnecting />}
        </div>
    )
};
export default Home;