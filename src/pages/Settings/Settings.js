import { Paper } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';
import { FiEdit } from 'react-icons/fi';

import './Settings.scss';
import ConnectionIcon from '../../components/ConnectionIcon/ConnectionIcon';

const Settings = () => {
    const { clients } = useContext(AppContext);

    const clientList = Object.values(clients || {});

    console.log('clients', clients)

    return (
        <div className='settings'>
            {clientList.length === 0 && <p>No Clients Found</p>}

            {clientList.map((client, i) => (
                <Paper elevation={1} className='client' key={i}>
                    <div className='topRow'>
                        <div className='name'>
                            <ConnectionIcon conencted={client.connected} />

                            <h3>{client.config.name || 'Empty Name'}</h3>

                            <button className='edit'>
                                <FiEdit />
                            </button>
                        </div>
                    </div>

                    <p>Latency: {client.config.latency}</p>

                </Paper>)
            )}
        </div>
    )
};

export default Settings;