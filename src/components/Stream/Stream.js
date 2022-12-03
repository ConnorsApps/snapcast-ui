import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';
import PlayingLoader from '../PlayingLoader/PlayingLoader';
import './Stream.scss';

const Stream = ({ id }) => {

    const { streams } = useContext(AppContext);
    const stream = streams[id];
    const name = stream?.uri?.query?.name || stream.id;
    console.log("stream", stream);

    return (
        <div className='stream'>
            <p> {name} </p>
            {stream.status === 'playing' && <PlayingLoader />}
            {stream.status === 'idle' && 'idle'}
        </div>
    );
};


export default Stream;