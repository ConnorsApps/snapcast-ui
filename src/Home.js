import './Home.scss';
import background from './assets/chirag-saini-wkZ_6jkugYM-unsplash.jpg';
import Loader from './components/Loader/Loader';
import { useContext } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Group from './components/Group/Group';
import { AppContext } from './utils/AppContext';

const title = process.env.REACT_APP_HOME_TITLE;

const Home = () => {
    const { groups, isLoading } = useContext(AppContext);

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
        </div>
    )
};
export default Home;