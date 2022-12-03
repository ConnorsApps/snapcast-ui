
import { IoVolumeMute, IoVolumeLow, IoVolumeMedium, IoVolumeHigh } from 'react-icons/io5'
import { Slider } from '@mui/material';
import './VolumeSlider.scss';

const VolumeIcon = ({ percent, muted }) => {
    if (percent === 0 || muted) {
        return <IoVolumeMute className='icon' />;
    } else if (percent < 30) {
        return <IoVolumeLow className='icon' />;
    } else if (percent < 60) {
        return <IoVolumeMedium className='icon' />;
    } else {
        return <IoVolumeHigh className='icon' />;
    }
}

const VolumeSlider = ({ volume, setVolume, color = 'secondary' }) => {
    const handleChange = (_, newValue) => setVolume({ percent: newValue, muted: volume.muted });


    return <div className='volume-slider'>
        <button
            onClick={() => setVolume({ percent: volume.percent, muted: !volume.muted })}
        >
            <VolumeIcon
                percent={volume.percent}
                muted={volume.muted}
            />
        </button>

        <Slider
            value={volume.percent}
            onChange={handleChange}
            color={color}
            disabled={volume.muted}
        />
    </div>
}

export default VolumeSlider;
