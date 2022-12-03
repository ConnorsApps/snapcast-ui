import './Client.scss';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { Paper } from '@mui/material';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import { useState } from 'react';
import { MdOutlineDragIndicator } from 'react-icons/md';

const Client = () => {
    const [volume, setVolume] = useState(0);
    const [muted, setMuted] = useState(false);

    return <Paper className='client'>
        <div className='topRow'>
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
        </div>

        <div className='dragIcon'>
            <MdOutlineDragIndicator />
        </div>
    </Paper>
}

export default Client;