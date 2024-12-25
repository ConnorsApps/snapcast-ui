import './Group.scss';
import { MenuItem, Paper, Select } from '@mui/material';
import Stream from '../../../components/Stream/Stream';
import Client from './Client/Client';
import { useContext } from 'react';
import { AppContext } from '../../../utils/AppContext';
import { REQUESTS } from '../../../utils/Constants';
import { VolumeIcon } from '../../../components/VolumeSlider/VolumeSlider';

const Group = ({ group, number }) => {
    const { streams, disbatchGroups } = useContext(AppContext);

    const setStream = (event) => {
        const selectedStream = event.target.value;
        const params = { id: group.id, stream_id: selectedStream };

        if (selectedStream !== group.stream_id)
            disbatchGroups({ type: REQUESTS.group.setStream, params });
    };

    const toggleMute = () => {
        const params = { id: group.id, mute: !group.mute };
        disbatchGroups({ type: REQUESTS.group.setMute, params })
    };

    return (
        <Paper
            className='group'
            elevation={3}
            sx={{ backgroundColor: '#ffffff79' }}
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
                        {Object.values(streams).map((stream, i) => (
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
                {group.clients.map((clientId, i) =>
                    <Client
                        clientId={clientId}
                        key={i}
                    />
                )}
            </div>
        </Paper>
    )
};

export default Group;