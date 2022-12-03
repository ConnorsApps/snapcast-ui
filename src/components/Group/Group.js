import './Group.scss';
import { Paper } from '@mui/material';
import Stream from '../Stream/Stream';
import Client from '../Client/Client';

const Group = ({ group }) => {

    const clients = group.clients.filter(client => client.connected);

    return (
        <Paper
            className='group'
            elevation={3}
        >
            <Stream
                id={group.stream_id}
            />
            {clients.map((client, i) =>
                <Client
                    client={client}
                    key={i}
                />
            )}
        </Paper>
    )
}

export default Group;