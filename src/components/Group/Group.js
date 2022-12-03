import './Group.scss';
import { MenuItem, Paper, Select } from '@mui/material';
import Stream from '../Stream/Stream';
import Client from '../Client/Client';
import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';

const Group = ({ group }) => {
    const { streams } = useContext(AppContext);
    const clients = group.clients.filter(client => client.connected);

    const streamList = Object.values(streams);

    const handleChange = (event) => {
        // setAge(event.target.value);
    };

    return (
        <Paper
            className='group'
            elevation={3}
        >
            <Select
                value={group.stream_id}
                onChange={handleChange}
                className='streamSelector'
            >
                {streamList.map((stream, i) => (
                    <MenuItem
                        value={stream.id}
                        key={i}
                    >
                        <Stream
                            id={stream.id}
                        />
                    </MenuItem>
                ))}
            </Select>
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