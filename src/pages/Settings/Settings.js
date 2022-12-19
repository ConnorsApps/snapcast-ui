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

            {clients.length === 0 && <p>No Clients</p>}

            {clients.map((client, i) => <ClientSetting client={client} key={i} />)}
        </Paper>
    );
}

const Settings = () => {
    const { groups, clients } = useContext(AppContext);
    const groupList = Object.values(groups ?? {});

    const clientList = Object.values(clients || {})
        .sort((a, b) => b.lastSeen.sec - a.lastSeen.sec);

    return (
        <div className='settings'>
            {groupList.map((group, i) => (
                <GroupSetting
                    group={group}
                    key={i}
                    number={i + 1}
                    clients={clientList.filter(c => c.groupId === group.id)}
                />
            ))}
        </div>
    )
};

export default Settings;