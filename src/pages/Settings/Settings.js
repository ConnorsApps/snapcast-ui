import { Button, Paper, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../../utils/AppContext';
import { FiEdit } from 'react-icons/fi';
import { formatDistance } from 'date-fns'

import './Settings.scss';
import ConnectionIcon from '../../components/ConnectionIcon/ConnectionIcon';
import { REQUESTS } from '../../utils/Constants';

const lastSeen = (secondsSince) => formatDistance(new Date(secondsSince * 1000), new Date(), { addSuffix: true });

const Client = ({ client }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [clientName, setClientName] = useState(client.config.name);
    const handleChange = (event) => setClientName(event.target.value);

    const { disbatchClients } = useContext(AppContext);

    const saveName = () => {
        setIsEditingName(false);
        disbatchClients({ type: REQUESTS.client.setName, params: { id: client.id, name: clientName } });
    };

    return (
        <Paper elevation={1} className='client'>
            <div className='topRow'>
                <div className='name'>
                    <ConnectionIcon conencted={client.connected} />

                    {isEditingName ? (
                        <>
                            <TextField
                                label='Name'
                                variant='outlined'
                                value={clientName}
                                onChange={handleChange}
                            />
                            <Button
                                className='save'
                                onClick={saveName}
                                variant='contained'
                            >
                                Save
                            </Button>
                        </>

                    ) : (
                        <>
                            <h3>{client.config.name || 'Empty Name'}</h3>
                            <button
                                className='edit'
                                onClick={() => setIsEditingName(!isEditingName)}
                            >
                                <FiEdit />
                            </button>
                        </>

                    )}


                    <p>
                        Last Seen: {lastSeen(client.lastSeen.sec)}
                    </p>
                </div>
            </div>

            <div className='info'>
                <div>
                    <p className='title'>Config</p>
                    <p>Latency: {client.config.latency}ms</p>
                    <p>Instance Id: {client.config.instance}</p>
                </div>
                <div className='host'>
                    <p className='title'>Host</p>
                    <div className='cols'>
                        <div>
                            <p>Arch: {client.host.arch}</p>
                            <p>Ip: {client.host.ip}</p>

                        </div>
                        <div>
                            <p>Name: {client.host.name}</p>
                            <p>Mac: {client.host.mac}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    )
};


const Settings = () => {
    const { clients } = useContext(AppContext);


    const clientList = Object.values(clients || {})
        .sort((a, b) => b.lastSeen.sec - a.lastSeen.sec);

    console.log('clients', clients)

    return (
        <div className='settings'>
            {clientList.length === 0 && <p>No Clients Found</p>}

            {clientList.map((client, i) => <Client client={client} key={i} />)}
        </div>
    )
};

export default Settings;