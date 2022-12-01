
import { IoVolumeMute, IoVolumeLow, IoVolumeMedium, IoVolumeHigh } from 'react-icons/io5'
import { Slider } from '@mui/material';
import './VolumeSlider.scss';

const VolumeIcon = ({ volume, muted }) => {
    if (volume === 0 || muted) {
        return <IoVolumeMute className='icon' />;
    } else if (volume < 30) {
        return <IoVolumeLow className='icon' />;
    } else if (volume < 60) {
        return <IoVolumeMedium className='icon' />;
    } else {
        return <IoVolumeHigh className='icon' />;
    }
}

const VolumeSlider = ({ volume, setVolume, muted, setMuted, color = 'secondary' }) => {
    const handleChange = (_, newValue) => setVolume(newValue);

    return <div className='volume-slider'>
        <button
            onClick={()=>setMuted(!muted)}
        >
            <VolumeIcon
                volume={volume}
                muted={muted}
            />
        </button>

        <Slider
            value={volume}
            onChange={handleChange}
            color={color}
            disabled={muted}
        />
    </div>
}

export default VolumeSlider;
