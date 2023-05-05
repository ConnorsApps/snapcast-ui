
import { IoVolumeMute, IoVolumeLow, IoVolumeMedium, IoVolumeHigh } from 'react-icons/io5'
import { Slider } from '@mui/material';
import './VolumeSlider.scss';

export const VolumeIcon = ({ percent, muted }) => {
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

// FROM https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
const iOS = () => {
    const platform = navigator.userAgentData?.platform || navigator.platform;

    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    // iPad on iOS 13 detection
}
const isIOS = iOS();

const VolumeSlider = ({ volume, setVolume, color = 'secondary' }) => {
    const handleChange = (event, newValue) => {
        // Slider component workaround for Safari https://github.com/mui/material-ui/issues/31869
        if (event.type === 'mousedown' && isIOS) {
            return;
        }
        setVolume({ percent: newValue, muted: volume.muted })
    };

    return (
        <div className='volume-slider'>
            <button
                onClick={() => setVolume({ percent: volume.percent, muted: !volume.muted })}
            >
                <VolumeIcon
                    percent={volume.percent}
                    muted={volume.muted}
                    aria-label='Toggle Mute'
                />
            </button>

            <Slider
                value={volume.percent}
                onChange={handleChange}
                color={color}
                disabled={volume.muted}
                aria-label='Volume Slider'
            />
        </div>)
}

export default VolumeSlider;
