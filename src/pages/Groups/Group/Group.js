import './Group.scss';
import { MenuItem, Paper, Select } from '@mui/material';
import Stream from '../../../components/Stream/Stream';
import Client from './Client/Client';
import { useContext } from 'react';
import { AppContext } from '../../../utils/AppContext';
import { REQUESTS } from '../../../utils/Constants';
import { VolumeIcon } from '../../../components/VolumeSlider/VolumeSlider';

const Group = ({ group, number }) => {
    const { streams, clients: allClients, disbatchGroups } = useContext(AppContext);

    const streamList = Object.values(streams);

    const clients = Object.values(allClients)
        .filter(client => client.groupId === group.id)
        .filter(clients => clients.connected);

    const setStream = (event) => {
        const selectedStream = event.target.value;
        const params = { id: group.id, stream_id: selectedStream };

        if (selectedStream !== group.stream_id)
            disbatchGroups({ type: REQUESTS.group.setStream, params });
    };

    if (clients.length === 0) {
        return <></>;
    };

    const toggleMute = () => {
        const params = { id: group.id, mute: !group.mute };
        disbatchGroups({ type: REQUESTS.group.setMute, params })
    };

    return (
        <Paper
            className='group'
            elevation={3}
        >
            <div className='info'>
                <p className='name'> {group.name || `Group ${number}`} </p>

                <div className='right'>
                    <button
                        onClick={toggleMute}
                        className='volumeIcon'
                        ariaLabel='Toggle Group Volume'
                    >
                        <VolumeIcon
                            muted={group.mute}
                        />
                    </button>
                    <Select
                        value={group.stream_id}
                        onChange={setStream}
                        className='streamSelector'
                        ariaLabel='Select Stream'
                    >
                        {streamList.map((stream, i) => (
                            <MenuItem
                                value={stream.id}
                                divider={true}
                                sx={{ padding: '1rem' }}
                                key={i}
                            >
                                <Stream
                                    id={stream.id}
                                />
                            </MenuItem>
                        ))}
                    </Select>
                </div>


            </div>
            <div className={`clients ${group.mute ? 'groupMuted' : ''}`}>
                {clients
                    .filter(client => client.connected)
                    .map((client, i) =>
                        <Client
                            id={client.id}
                            key={i}
                        />
                    )}
            </div>
        </Paper>
    )
};

export default Group;