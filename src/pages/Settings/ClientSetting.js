import './ClientSetting.scss';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';
import { BsFillSpeakerFill } from 'react-icons/bs';
import ConnectionIcon from '../../components/ConnectionIcon/ConnectionIcon';
import { REQUESTS } from '../../utils/Constants';
import { formatDistance } from 'date-fns';
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from 'react-icons/ai';

const lastSeen = (secondsSince) => formatDistance(new Date(secondsSince * 1000), new Date(), { addSuffix: true });

const ClientSetting = ({ client }) => {
    const { disbatchClients, disbatchGroups, groups } = useContext(AppContext);
    const groupList = Object.values(groups);

    const handleChange = (event) => {
        disbatchClients({
            type: REQUESTS.client.setName,
            params: {
                id: client.id,
                name: event.target.value
            }
        });
    };

    const groupChange = (event) => {
        const group = groups[event.target.value];
        const existingClients = group.clients.map(client => client.id);
        const newClients = existingClients.concat(client.id);

        disbatchGroups({
            type: REQUESTS.group.setClients,
            params: {
                id: event.target.value,
                clients: newClients
            }
        });
    };

    const setLatency = (value) => {
        if (value >= 0) {
            disbatchClients({
                type: REQUESTS.client.setLatency,
                params: {
                    id: client.id,
                    latency: value
                }
            });
        }
    };

    const deleteClient = () => {
        disbatchClients({
            type: REQUESTS.server.deleteClient,
            params: {
                id: client.id
            }
        });
    };

    return (
        <Paper
            elevation={1}
            className='clientSetting'
        >
            <div className='mainInfo'>
                <div className='row'>
                    <ConnectionIcon conencted={client.connected} />
                    <BsFillSpeakerFill className='icon' />

                    <TextField
                        label='Name'
                        variant='standard'
                        value={client.config.name}
                        onChange={handleChange}
                        sx={{ minWidth: '10rem' }}
                    />
                </div>

                <div className='latency row'>
                    <p> Latency: {client.config.latency}ms </p>
                    <ButtonGroup>
                        <Button
                            className='stepper'
                            onClick={() => setLatency(--client.config.latency)}
                        >
                            <AiOutlineMinus />
                        </Button>
                        <Button
                            className='stepper'
                            onClick={() => setLatency(++client.config.latency)}
                        >
                            <AiOutlinePlus />
                        </Button>
                    </ButtonGroup>
                </div>
                <div>
                    <p className='lastSeen'>Seen: {lastSeen(client.lastSeen.sec)}</p>
                </div>
            </div>

            <div className='info'>
                <div className='clientName'>
                    {client.host.name} IP: {client.host.ip}
                </div>
                <div className='secondary'>
                    <p>Instance Id: {client.config.instance}</p>
                    <p>Mac: {'  '}
                        <span className='mac'>
                            {client.host.mac}
                        </span>
                    </p>
                </div>
                <FormControl className='group'>
                    <InputLabel id={`group-label-${client.id}`}>Group</InputLabel>
                    <Select
                        labelId={`group-label-${client.id}`}
                        label='Group'
                        value={client.groupId}
                        onChange={groupChange}
                    >
                        {groupList.map((group, i) => (
                            <MenuItem
                                key={i}
                                value={group.id}
                            >
                                {group.name || `Group ${i + 1}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {!client.connected && (
                <button
                    className='delete'
                    onClick={deleteClient}
                >
                    <AiFillDelete />
                </button>
            )}
        </Paper>
    )
};

export default ClientSetting;