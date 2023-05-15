import { MenuItem, Paper, Select, useTheme } from '@mui/material';
import './StreamBar.scss';
import Stream from '../../components/Stream/Stream';
import VolumeSlider from '../../components/VolumeSlider/VolumeSlider';
import { useContext, useState } from 'react';
import { AppContext } from '../../utils/AppContext';

const StreamBar = () => {
    const theme = useTheme();
    const [volume, setVolume] = useState({ volume: 0, muted: false });
    const { streams } = useContext(AppContext);
    const streamList = Object.values(streams);

    return (
        <Paper
            className='streamBar'
            elevation={3}
            sx={{ backgroundColor: theme.palette.transparent.main }}
        >
            <VolumeSlider volume={volume} setVolume={setVolume} />
            <Select
                className='streamSelector'
                aria-label='Select Stream'
                value={'default'}
                onChange={()=>{}}
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
        </Paper>
    )
};

export default StreamBar;