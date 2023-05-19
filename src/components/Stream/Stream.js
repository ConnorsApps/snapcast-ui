import { SiAirplayaudio, SiPlex, SiSoundcloud, SiSpotify } from 'react-icons/si';
import PlayingLoader from '../PlayingLoader/PlayingLoader';
import './Stream.scss';

const SteamIcon = ({ artData, name }) => {
    const streamName = name ? name.toLowerCase() : '';

    if (artData && artData.extension === 'svg') {
        const image = atob(artData.data);
        return (
            <img
                className='streamIcon'
                alt='Steam Icon'
                src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
            />);
    } else if (streamName.includes('airplay')) {
        return <SiAirplayaudio className='streamIcon inferedIcon' />;
    } else if (streamName.includes('plex')) {
        return <SiPlex className='streamIcon inferedIcon' />;
    } else if (streamName.includes('soundcloud')) {
        return <SiSoundcloud className='streamIcon inferedIcon soundcloud' />;
    } else if (streamName.includes('spotify')) {
        return <SiSpotify className='streamIcon inferedIcon spotify' />;
    } else {
        return <></>;
    }
};

const Stream = ({ stream }) => {
    const name = stream?.uri?.query?.name || stream.id;

    const artData = stream?.properties?.metadata?.artData;
    return (
        <div className='stream'>
            <SteamIcon artData={artData} name={name} />
            <p> {name} {stream.status === 'idle' && 'idle'} </p>
            {stream.status === 'playing' && <PlayingLoader />}
        </div>
    );
};

export default Stream;