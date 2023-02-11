import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';
import PlayingLoader from '../PlayingLoader/PlayingLoader';
import './Stream.scss';

const SteamIcon = ({ artData }) => {
    if (artData.extension === 'svg') {
       
        const image = atob(artData.data);
        return <img
            className='streamIcon'
            alt='Steam Icon'
            src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
        />
    } else {
        return <></>
    }
};

const Stream = ({ id }) => {
    const { streams } = useContext(AppContext);
    const stream = streams[id];
    const name = stream?.uri?.query?.name || stream.id;

    const artData = stream?.properties?.metadata?.artData;
    return (
        <div className='stream'>
            {artData && <SteamIcon artData={artData} />}
            <p> {name} </p>
            {stream.status === 'playing' && <PlayingLoader />}
            {stream.status === 'idle' && 'idle'}
        </div>
    );
};


export default Stream;