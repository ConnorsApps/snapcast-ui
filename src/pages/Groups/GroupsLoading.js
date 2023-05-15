import { Paper, Skeleton } from '@mui/material';
import './GroupsLoading.scss';

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

const GroupsLoading = ({ isLoading, setLoadingAnimationShowing }) => {
    const clients = [0, 1];

    return (
        <div
            className={`groups groupsLoading ${isLoading ? '' : 'groupsHidden'}`}
            onTransitionEnd={() => setLoadingAnimationShowing(false)}
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
};


export default GroupsLoading;