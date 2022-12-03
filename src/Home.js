import background from './assets/chirag-saini-wkZ_6jkugYM-unsplash.jpg';
import Loader from './components/Loader/Loader';
import { useContext } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Group from './components/Group/Group';
import { AppContext } from './utils/AppContext';

const title = process.env.REACT_APP_HOME_TITLE;

const Home = () => {
    const { groups, streams, isLoading } = useContext(AppContext);

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

            {groups.map((group, i) =>
                <Group
                    key={i}
                    group={group}
                />
            )}

            <Loader isLoading={isLoading} />
        </div>
    )
};
export default Home;