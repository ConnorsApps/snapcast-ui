import { MenuItem, Paper, Select, useTheme } from '@mui/material';
import './StreamBar.scss';
import Stream from '../../components/Stream/Stream';
import VolumeSlider from '../../components/VolumeSlider/VolumeSlider';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../utils/AppContext';
import { internalVolumes } from '../../utils/InternalVolumes';
import { REQUESTS } from '../../utils/Constants';

const StreamBar = () => {
    const theme = useTheme();
    const { streams, groups, disbatch } = useContext(AppContext);
    const [selectedStream, setSelectedStream] = useState('default');
    const streamList = Object.values(streams);
    const [volume, setVolume] = useState({ percent: 50, muted: false });
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // store last selected group keep as default
        let streamClients = [];
        // const volumes = internalVolumes.get();

        // let totalVolume = 0;

        for (const group of Object.values(groups)) {
            if (group.stream_id === selectedStream) {
                for (const client of Object.values(group.clients)) {
                    // totalVolume += volumes[client.id].percent;
                    streamClients.push({
                        id: client.id,
                        volume: client.config.volume
                    });
                }
            }
        }

        setClients(streamClients);

    }, [selectedStream, groups, volume.muted]);

    // useEffect(() => {
    //     const volumes = internalVolumes.get();
    //     let total = 0;
    //     for (const client of clients) {
    //         total += volumes[client.id].percent;
    //     }

    //     setVolume({
    //         percent: total / clients.length,
    //         muted: volume.muted
    //     });
    //     console.log('total',total)
    // }, [clients, volume.muted]);

    const setStreamVolume = (e) => {
        const volumes = internalVolumes.get();
        let sum = 0;

        for (const client of clients) {
            sum += client.volume.percent;
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
                params: { id: client.id, volume: { percent: clientVolume(volumes[client.id].percent) } }
            });
        }

        setVolume(e);
    };


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
                    onChange={(e) => setSelectedStream(e.target.value)}
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