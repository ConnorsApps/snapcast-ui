import './Home.scss';
import background from './assets/josiah-gardner-ksi5l4iJBjM-unsplash.jpg';
import Loader from './components/Loader/Loader';
import { useContext, useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { AppContext } from './utils/AppContext';
import { IoSettingsOutline, IoHomeOutline } from 'react-icons/io5';
import Groups from './pages/Groups/Groups';
import ErrorConnecting from './components/ErrorConnecting/ErrorConnecting';
import Settings from './pages/Settings/Settings';

const title = process.env.REACT_APP_HOME_TITLE;

const Home = () => {
    const { failed, isLoading } = useContext(AppContext);
    const [page, setPage] = useState('groups');

    return (
        <div
            className='home'
            style={{ backgroundImage: `url(${background})` }}
        >
            <AppBar className='appBar' position="static">
                <Toolbar variant="regular">
                    <h1> {title ?? 'Snapcast Audio'} </h1>
                    <button
                        className='menuPage'
                        onClick={() => setPage(page === 'groups' ? 'settings' : 'groups')}
                    >
                        {page === 'groups' && <IoSettingsOutline />}
                        {page === 'settings' && <IoHomeOutline />}
                    </button>
                </Toolbar>
            </AppBar>

            {page === 'groups' && <Groups />}
            {page === 'settings' && <Settings />}

            <Loader isLoading={isLoading} />
            {failed && <ErrorConnecting />}
        </div>
    )
};
export default Home;