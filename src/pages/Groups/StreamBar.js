import { Chip, MenuItem, Paper, Select } from '@mui/material';
import './StreamBar.scss';
import Stream from '../../components/Stream/Stream';
import VolumeSlider from '../../components/VolumeSlider/VolumeSlider';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../utils/AppContext';
import { REQUESTS } from '../../utils/Constants';
import { SlArrowUp } from 'react-icons/sl';

const StreamBar = () => {
    const { streams, groups, disbatch, internalVolumes } = useContext(AppContext);
    const streamList = Object.values(streams);
    const [selectedStream, setSelectedStream] = useState(localStorage.getItem('lastSelectedStream') ?? streamList[0].id);
    const [volume, setVolume] = useState({ percent: 50, muted: false });
    const [clients, setClients] = useState([]);

    const selectStream = (stream) => {
        localStorage.setItem('lastSelectedStream', stream);
        setSelectedStream(stream);
    };

    useEffect(() => {
        let streamClients = [];
        let total = 0;

        for (const group of Object.values(groups)) {
            if (group.stream_id === selectedStream) {
                for (const client of Object.values(group.clients)) {
                    if (client.connected) {
                        streamClients.push({
                            id: client.id,
                            volume: client.config.volume
                        });
                        total += client.config.volume.percent;
                    }
                }
            }
        }

        setClients(streamClients);
        setVolume({
            percent: streamClients.length > 0 ? total / streamClients.length : 50,
            muted: volume.muted,
        });

    }, [selectedStream, groups, volume.muted, setClients, setVolume]);

    const setStreamVolume = useCallback((e) => {
        let sum = 0;

        for (const client of clients) {
            sum += internalVolumes[client.id].percent;
        }

        const newStreamVolume = e.percent;
        const oldStreamVolume = sum / clients.length;

        const delta = newStreamVolume - oldStreamVolume;
        let ratio;
        if (delta < 0) {
            ratio = (oldStreamVolume - newStreamVolume) / oldStreamVolume;
        } else {
            ratio = (newStreamVolume - oldStreamVolume) / (100 - oldStreamVolume);
        }

        const clientVolume = (current) => {
            let vol = current;
            if (delta < 0) {
                vol -= ratio * current;
            } else {
                vol += ratio * (100 - current);
            }
            return vol;
        }

        for (const client of clients) {
            disbatch({
                type: REQUESTS.client.setVolume,
                params: {
                    id: client.id,
                    volume: {
                        percent: clientVolume(internalVolumes[client.id].percent),
                        muted: client.volume.muted,
                    }
                }
            });
        }

        setVolume(e);
    }, [clients, disbatch, internalVolumes]);

    const selectGroup = useCallback((group) => {
        if (group.stream_id !== selectedStream) {
            disbatch({
                type: REQUESTS.group.setStream,
                params: {
                    id: group.id,
                    stream_id: selectedStream,
                },
            });
        } else {
            disbatch({
                type: REQUESTS.group.setMute,
                params: {
                    id: group.id,
                    mute: !group.mute,
                },
            });
        }

    }, [selectStream, disbatch, selectedStream]);

    return (
        <Paper
            className='streamBar'
            elevation={3}
            sx={{ backgroundColor: '#fffffffa' }}
        >
            <div className='topRow'>
                <div>
                    <SlArrowUp />
                </div>
                <Select
                    className='selector'
                    aria-label='Select Stream'
                    sx={{ height: '4rem' }}
                    value={selectedStream}
                    onChange={(e) => selectStream(e.target.value)}
                >
                    {streamList.map((stream, i) => (
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
                <div className='groupChips'>
                    {Object.values(groups).map((group, i) => (
                        <Chip
                            onClick={() => selectGroup(group)}
                            variant={group.stream_id === selectedStream && !group.mute ? 'filled' : 'outlined'}
                            key={i}
                            label={group.name && group.name !== '' ? group.name : `Group ${i + 1}`}
                            color='primary'
                        />
                    ))}
                </div>
            </div>
            <VolumeSlider
                volume={volume}
                setVolume={setStreamVolume}
            />
        </Paper>
    )
};

export default StreamBar;