import { Paper, Skeleton } from '@mui/material';
import './GroupsLoading.scss';

const ClientLoading = ({ clientsCount }) => (
    <Paper className={`client ${clientsCount > 4 ? 'clientCondensed' : ''}`}>
        <div className='title'>
            <Skeleton
                variant='rounded'
                width={25}
                height={35}
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
                width={28}
                height={28}
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

const getGroupCounts = () => {
    const groupCounts = localStorage.getItem('groupCounts');
    if (!groupCounts || groupCounts === '') {
        return [2];
    } else {
        return JSON.parse(groupCounts);
    }
};

const GroupsLoading = ({ isLoading, setLoadingAnimationShowing }) => {
    const groups = getGroupCounts();
    let clientsCount = 0;
    if (groups.length !== 0) {
        clientsCount = groups.reduce((sum, val) => sum + val);
    }

    return (
        <div
            className={`groups groupsLoading ${isLoading ? '' : 'groupsHidden'}`}
            onTransitionEnd={() => setLoadingAnimationShowing(false)}
        >
            {groups.map((groupCount, i) => (
                <Paper
                    className='group'
                    elevation={3}
                    key={i}
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
                        {Array.from({ length: groupCount })
                            .map((_, y) => <ClientLoading key={y}  clientsCount={clientsCount} />)
                        }
                    </div>
                </Paper>
            ))}
        </div>
    );
};


export default GroupsLoading;