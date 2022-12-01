import './Group.scss';
import { Paper } from '@mui/material';

const Group = ({ children }) => {

    return <Paper className='group' elevation={3}>
        {children}
    </Paper>
}

export default Group;