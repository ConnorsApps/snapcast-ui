import './Group.scss';
import { MenuItem, Paper, Select, useTheme } from '@mui/material';
import Stream from '../../../components/Stream/Stream';
import Client from './Client/Client';
import { useContext } from 'react';
import { AppContext } from '../../../utils/AppContext';
import { REQUESTS } from '../../../utils/Constants';
import { VolumeIcon } from '../../../components/VolumeSlider/VolumeSlider';

const Group = ({ group, number }) => {
    const { streams, disbatch } = useContext(AppContext);
    const theme = useTheme();

    const clients = Object.values(group.clients ?? []).filter(clients => clients.connected);

    const setStream = (event) => {
        const selectedStream = event.target.value;
        const params = { id: group.id, stream_id: selectedStream };

        if (selectedStream !== group.stream_id)
            disbatch({ type: REQUESTS.group.setStream, params });
    };

    if (clients.length === 0) {
        return <></>;
    };

    const toggleMute = () => {
        const params = { id: group.id, mute: !group.mute };
        disbatch({ type: REQUESTS.group.setMute, params })
    };

    return (
        <Paper
            className='group'
            elevation={3}
            sx={{ backgroundColor: theme.palette.transparent.main }}
        >
            <div className='info'>
                <p className='name'> {group.name || `Group ${number}`} </p>

                <div className='right'>
                    <button
                        onClick={toggleMute}
                        className='volumeIcon'
                        aria-label='Toggle Group Volume'
                    >
                        <VolumeIcon
                            muted={group.mute}
                        />
                    </button>
                    <Select
                        value={group.stream_id}
                        onChange={setStream}
                        className='streamSelector'
                        aria-label='Select Stream'
                        sx={{height: '3.5rem'}}
                    >
                        {streams.map((stream, i) => (
                            <MenuItem
                                value={stream.id}
                                divider={true}
                                sx={{ padding: '1rem' }}
                                key={i}
                            >
                                <Stream
                                    stream={stream}
                                />
                            </MenuItem>
                        ))}
                    </Select>
                </div>


            </div>
            <div className={`clients ${group.mute ? 'groupMuted' : ''}`}>
                {clients.map((client, i) =>
                    <Client
                        client={client}
                        key={i}
                    />
                )}
            </div>
        </Paper>
    )
};

export default Group;