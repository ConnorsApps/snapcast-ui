import { MenuItem, Paper, Select, useTheme } from '@mui/material';
import './StreamBar.scss';
import Stream from '../../components/Stream/Stream';
import VolumeSlider from '../../components/VolumeSlider/VolumeSlider';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../utils/AppContext';
import { REQUESTS } from '../../utils/Constants';

const StreamBar = () => {
    const theme = useTheme();
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

        for (const group of Object.values(groups)) {
            if (group.stream_id === selectedStream) {
                for (const client of Object.values(group.clients)) {
                    if (client.connected) {
                        streamClients.push({
                            id: client.id,
                            volume: client.config.volume
                        });
                    }
                }
            }
        }

        setClients(streamClients);

    }, [selectedStream, groups, volume.muted]);

    useEffect(() => {
        let total = 0;
        for (const client of clients) {
            total += internalVolumes[client.id].percent;
        }

        setVolume({
            percent: clients.length > 0 ? total / clients.length : 50,
            muted: volume.muted
        });
    }, [internalVolumes]);

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
                        percent: clientVolume(internalVolumes[client.id].percent)
                    }
                }
            });
        }

        setVolume(e);
    }, [clients, internalVolumes]);


    return (
        <Paper
            className='streamBar'
            elevation={3}
            sx={{ backgroundColor: theme.palette.transparent.main }}
        >
            <div className='topRow'>
                <Select
                    className='selector'
                    aria-label='Select Stream'
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
            </div>
            <VolumeSlider
                volume={volume}
                setVolume={setStreamVolume}
            />
        </Paper>
    )
};

export default StreamBar;