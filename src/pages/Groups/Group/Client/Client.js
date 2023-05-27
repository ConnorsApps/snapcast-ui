import './Client.scss';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { Paper } from '@mui/material';
import VolumeSlider from '../../../../components/VolumeSlider/VolumeSlider';
import { useCallback, useContext, useState } from 'react';
import { AppContext } from '../../../../utils/AppContext';
import { REQUESTS } from '../../../../utils/Constants';

const Client = ({ clientId }) => {
    const { disbatchClients, clients } = useContext(AppContext);
    const [clientsLength, setClientsLength] = useState(Object.keys(clients).length);
    const client = clients[clientId];
    const name = !client.config.name || client.config.name === '' ? client.host.name : client.config.name;

    const setVolume = useCallback((volume) => {
        disbatchClients({
            type: REQUESTS.client.setVolume,
            params: {
                id: clientId,
                volume,
            }
        });
    }, [clientId, disbatchClients]);

    useCallback(() => {
        setClientsLength(Object.keys(clients).length);
    }, [clients]);

    if (!client.connected) {
        return <></>;
    }

    return (
        <Paper
            className={`client ${clientsLength > 4 ? 'clientCondensed' : ''}`}
        >
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