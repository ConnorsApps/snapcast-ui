import './Client.scss';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { Paper } from '@mui/material';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import { useContext } from 'react';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { AppContext } from '../../utils/AppContext';
import { REQUESTS } from '../../utils/Constants';

const Client = ({ id }) => {
    const { clients, disbatchClients } = useContext(AppContext);
    const client = clients[id];
    const name = !client.config.name || client.config.name === '' ? client.host.name : client.config.name;

    const setVolume = (volume) => {
        disbatchClients({ type: REQUESTS.client.setVolume, params: { id, volume } });
    };

    return (
        <Paper className='viewClient'>
            <div className='topRow'>
                <div className='title'>
                    <BsFillSpeakerFill />
                    <p> {name} </p>

                </div>
                <VolumeSlider
                    volume={client.config.volume}
                    setVolume={setVolume}
                />
            </div>

            <div className='dragIcon'>
                <MdOutlineDragIndicator />
            </div>
        </Paper>);
}

export default Client;