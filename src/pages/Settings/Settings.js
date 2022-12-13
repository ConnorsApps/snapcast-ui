import { Paper, TextField } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';
import { formatDistance } from 'date-fns';
import { BsFillSpeakerFill } from 'react-icons/bs';

import './Settings.scss';
import ConnectionIcon from '../../components/ConnectionIcon/ConnectionIcon';
import { REQUESTS } from '../../utils/Constants';

const lastSeen = (secondsSince) => formatDistance(new Date(secondsSince * 1000), new Date(), { addSuffix: true });

const Client = ({ client }) => {
    const { disbatchClients } = useContext(AppContext);

    const handleChange = (event) => {
        disbatchClients({ type: REQUESTS.client.setName, params: { id: client.id, name: event.target.value } });
    };

    return (
        <Paper elevation={1} className='client'>
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

            {/* <div className='info'>
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
                    <p>Mac: {client.host.mac}</p>
                </div>
            </div> */}

        </Paper>
    )
};


const Settings = () => {
    const { clients } = useContext(AppContext);


    const clientList = Object.values(clients || {})
        .sort((a, b) => b.lastSeen.sec - a.lastSeen.sec);

    return (
        <div className='settings'>
            {clientList.length === 0 && <p>No Clients Found</p>}

            {clientList.map((client, i) => <Client client={client} key={i} />)}
        </div>
    )
};

export default Settings;