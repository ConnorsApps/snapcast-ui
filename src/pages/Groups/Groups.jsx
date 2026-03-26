import { Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Group from './Group/Group';
import { AppContext } from '../../utils/AppContext';
import GroupsLoading from './GroupsLoading';
import { WEBSOCKET_STATUS } from '../../utils/WebSocket';
import './Groups.scss';

const Groups = () => {
    const { groups, isLoading, status } = useContext(AppContext);
    // For smooth fade out transition
    const [loadingAnimationShowing, setLoadingAnimationShowing] = useState(isLoading);
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        setGroupList(Object.values(groups ?? {}))
    }, [groups]);

    if (isLoading || loadingAnimationShowing) {
        return (
            <GroupsLoading
                isLoading={isLoading}
                setLoadingAnimationShowing={setLoadingAnimationShowing}
            />
        );
    } else if (status === WEBSOCKET_STATUS.open) {
        if (groupList.length === 0) {
            return (
                <div className='groups'>
                    <Paper className='noGroups'>
                        <p>No Groups Found</p>
                        <p>Add a Snapcast client to get started.</p>
                    </Paper>
                </div>
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
                </div>
            );
        }
    } else {
        return <></>;
    }
}

export default Groups;