import { Paper, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../../utils/AppContext';
import { REQUESTS } from '../../utils/Constants';
import ClientSetting from './ClientSetting/ClientSetting';

import './Settings.scss';

const GroupSetting = ({ group, clients, number }) => {
    const { disbatchGroups } = useContext(AppContext)
    const [groupName, setGroupName] = useState(group.name || `Group ${number}`);

    const changeGroupName = (event) => {
        const name = event.target.value;
        setGroupName(name);
        const params = { id: group.id, name };
        disbatchGroups({ type: REQUESTS.group.setName, params });
    };

    return (
        <Paper className='groupSetting'>
            <div className='groupName'>
                <TextField
                    label='Name'
                    variant='standard'
                    value={groupName}
                    onChange={changeGroupName}
                />
            </div>

            {clients.length === 0 && <p> No Clients </p>}

            <div className='clients'>
                {clients.map((client, i) => (
                    <ClientSetting client={client} groupId={group.id} key={i} />
                ))
                }
            </div>

        </Paper>
    );
}

const Settings = () => {
    const { groups, clients } = useContext(AppContext);
    const groupList = Object.values(groups ?? {});

    return (
        <div className='settings'>
            {groupList.map((group, i) => (
                <GroupSetting
                    group={group}
                    key={i}
                    number={i + 1}
                    clients={group.clients.map(clientId => clients[clientId])
                        .sort((a, b) => b.lastSeen.sec - a.lastSeen.sec)}
                />
            ))}
        </div>
    )
};

export default Settings;