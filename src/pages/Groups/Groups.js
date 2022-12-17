import { Paper } from '@mui/material';
import { useContext } from 'react';
import Group from '../../components/Group/Group';
import { AppContext } from '../../utils/AppContext';
import './Groups.scss';

const Groups = () => {
    const { groups, isLoading } = useContext(AppContext);

    const groupList = Object.values(groups ?? {});

    if (!isLoading && groupList.length === 0) {
        return (
            <div className='groups'>
                <Paper className='noGroups'>
                    <p>No Groups Found</p>
                    <p>Add a snapcast Client to get started.</p>
                </Paper>
            </div>
        );
    }

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
    )
}

export default Groups;