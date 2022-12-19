import { Paper, Skeleton } from '@mui/material';
import { useContext, useState } from 'react';
import Group from './Group/Group';
import { AppContext } from '../../utils/AppContext';
import './Groups.scss';

const ClientLoading = () => (
    <Paper className='viewClient'>
        <div className='title'>
            <Skeleton
                variant='rounded'
                width={30}
                height={40}
            />
            <Skeleton
                className='clientName'
                variant='text'
                width={200}
            />
        </div>
        <div className='volumeSkeleton'>
            <Skeleton
                variant='circular'
                width={30}
                height={30}
            />
            <Skeleton
                className='slider'
                variant='text'
                height={30}
                width='90%'
            />
        </div>

    </Paper>
);

const Groups = () => {
    const { groups, isLoading } = useContext(AppContext);
    const [showLoading, setShowLoading] = useState(isLoading);
    const groupList = Object.values(groups ?? {});

    const clients = [0, 1];

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
    if (showLoading) {
        return (
            <div
                className={`groups groupsLoading ${isLoading ? '' : 'groupsHidden'}`}
                onTransitionEnd={() => setShowLoading(false)}
            >
                <Paper
                    className='group'
                    elevation={3}
                >
                    <div className='info'>
                        <p className='name'>
                            <Skeleton
                                variant='text'
                                width={120}
                                height={50}
                            />
                        </p>
                        <Skeleton
                            variant='rounded'
                            width={150}
                            height={50}
                        />
                    </div>
                    <div className='clients'>
                        {clients.map(c => <ClientLoading key={c} />)}
                    </div>
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
    };
}

export default Groups;