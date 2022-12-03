import { useState } from 'react';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import './Stream.scss';

const Stream = ({ id }) => {
    const [volume, setVolume] = useState(0);
    const [muted, setMuted] = useState(false);
    
    return <div className='stream'>
        <p> {id} </p>

        <VolumeSlider
            volume={volume}
            setVolume={setVolume}
            muted={muted}
            setMuted={setMuted}
        />
    </div>
};


export default Stream;