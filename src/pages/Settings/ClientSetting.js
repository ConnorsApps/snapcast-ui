import './ClientSetting.scss';
import { Paper, TextField } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';
import { BsFillSpeakerFill } from 'react-icons/bs';
import ConnectionIcon from '../../components/ConnectionIcon/ConnectionIcon';
import { REQUESTS } from '../../utils/Constants';
import { formatDistance } from 'date-fns';

const lastSeen = (secondsSince) => formatDistance(new Date(secondsSince * 1000), new Date(), { addSuffix: true });

const ClientSetting = ({ client }) => {
    const { disbatchClients } = useContext(AppContext);

    const handleChange = (event) => {
        disbatchClients({ type: REQUESTS.client.setName, params: { id: client.id, name: event.target.value } });
    };

    return (
        <Paper elevation={1} className='clientSetting'>
            <div className='mainInfo'>
                <div className='row'>
                    <BsFillSpeakerFill className='icon' />

                    <TextField
                        label='Name'
                        variant='standard'
                        value={client.config.name}
                        onChange={handleChange}
                        sx={{ minWidth: '10rem' }}
                    />

                </div>
                <div className='lastSeen'>
                    <ConnectionIcon conencted={client.connected} /> Seen: {lastSeen(client.lastSeen.sec)}
                </div>
            </div>

            <div className='info'>
                <div className='col'>
                    <p className='title'>Config</p>
                    <p>Latency: {client.config.latency}ms</p>
                    <p>Instance Id: {client.config.instance}</p>
                    <p>Arch: {client.host.arch}</p>

                </div>

                <div className='col'>
                    <p className='title'>Host</p>
                    <p>Ip: {client.host.ip}</p>
                    <p>Name: {client.host.name}</p>
                    <p>Mac: <span className='mac'>{client.host.mac}</span></p>
                </div>
            </div>

        </Paper>
    )
};

export default ClientSetting;