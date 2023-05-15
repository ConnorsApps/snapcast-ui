import './Client.scss';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { Paper } from '@mui/material';
import VolumeSlider from '../../../../components/VolumeSlider/VolumeSlider';
import { useContext } from 'react';
import { AppContext } from '../../../../utils/AppContext';
import { REQUESTS } from '../../../../utils/Constants';

const Client = ({ client }) => {
    const { disbatch } = useContext(AppContext);
    const name = !client.config.name || client.config.name === '' ? client.host.name : client.config.name;

    const setVolume = (volume) => {
        disbatch({ type: REQUESTS.client.setVolume, params: { id: client.id, volume } });
    };

    return (
        <Paper className='viewClient'>
            <div className='title'>
                <BsFillSpeakerFill />
                <p> {name} </p>
            </div>

            <VolumeSlider
                volume={client.config.volume}
                setVolume={setVolume}
            />
        </Paper>
    );
}

export default Client;