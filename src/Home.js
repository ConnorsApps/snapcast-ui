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
import { SafeArea } from 'capacitor-plugin-safe-area';
import { Capacitor } from '@capacitor/core';

const title = process.env.REACT_APP_HOME_TITLE;

const Home = () => {
    const { webSocketStatus, isLoading, theme } = useContext(AppContext);
    const [page, setPage] = useState('groups');
    const [statusBarHeight, setStatusBarHeight] = useState(0);


    useState(() => {
        let height = 0;

        (async () => {
            if (Capacitor.isNativePlatform()) {
                const { statusBarHeight } = await SafeArea.getStatusBarHeight();
                height = statusBarHeight;
            }
            setStatusBarHeight(height);
        })();

    }, [setStatusBarHeight])


    return (
        <div
            className='home'
            style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        >
            <AppBar className='appBar' position="static">
                <Toolbar sx={{ paddingY: '.5rem', marginTop: `${statusBarHeight}px` }} variant="regular">
                    <h1> {title ?? 'Snapcast Audio'} </h1>
                    <div className='rightOptions'>
                        {page === 'settings' && <theme.Selector
                            className='themeSelector'
                        />}
                        <button
                            className='togglePage'
                            onClick={() => setPage(page === 'groups' ? 'settings' : 'groups')}
                            aria-label='Toggle Page'
                        >
                            {page === 'groups' && <IoSettingsOutline />}
                            {page === 'settings' && <IoHomeOutline />}
                        </button>
                    </div>
                </Toolbar>
            </AppBar>

            {webSocketStatus === WEBSOCKET_STATUS.failed ? (
                <ErrorConnecting />
            ) : (
                <>
                    {page === 'groups' && <Groups />}
                    {page === 'settings' && <Settings />}
                </>
            )}
            <Loader isLoading={isLoading} />
        </div>
    )
};
export default Home;