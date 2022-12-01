import './Client.scss';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { Paper } from '@mui/material';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import { useState } from 'react';

const Client = () => {
    const [volume, setVolume] = useState(0);
    const [muted, setMuted] = useState(false);

    return <Paper className='client'>
        <div className='title'>
            <BsFillSpeakerFill />
            <p> Outside </p>

        </div>
        <VolumeSlider
            volume={volume}
            setVolume={setVolume}
            muted={muted}
            setMuted={setMuted}
        />
    </Paper>
}

export default Client;