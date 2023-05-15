import { Paper } from '@mui/material';
import { useContext, useState } from 'react';
import Group from './Group/Group';
import { AppContext } from '../../utils/AppContext';
import GroupsLoading from './GroupsLoading';
import StreamBar from './StreamBar';
import './Groups.scss';

const Groups = () => {
    const { groups, isLoading } = useContext(AppContext);
    // For smooth fade transition
    const [loadingAnimationShowing, setLoadingAnimationShowing] = useState(isLoading);
    const groupList = Object.values(groups ?? {});

    if (!isLoading && groupList.length === 0) {
        return (
            <div className='groups'>
                <Paper className='noGroups'>
                    <p>No Groups Found</p>
                    <p>Add a Snapcast client to get started.</p>
                </Paper>
            </div>
        );
    } else if (loadingAnimationShowing) {
        return (
            <GroupsLoading
                isLoading={isLoading}
                setLoadingAnimationShowing={setLoadingAnimationShowing}
            />
        );
    } else {
        return (
            <div className='groups'>
                {groupList.map((group, i) =>
                    <Group
                        key={i}
                        group={group}
                        number={i + 1}
                    />
                )}
                <StreamBar />
            </div>
        );
    };
}

export default Groups;