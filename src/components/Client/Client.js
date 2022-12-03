import './Client.scss';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { Paper } from '@mui/material';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import { useState } from 'react';
import { MdOutlineDragIndicator } from 'react-icons/md';

const Client = ({ client }) => {
    // console.log("client",client);
    const name = !client.config.name || client.config.name === '' ? client.host.name : client.config.name;
    const [volume, setVolume] = useState(client.config.volume);

    return <Paper className='client'>
        <div className='topRow'>
            <div className='title'>
                <BsFillSpeakerFill />
                <p> {name} </p>

            </div>
            <VolumeSlider
                volume={volume}
                setVolume={setVolume}
            />
        </div>

        <div className='dragIcon'>
            <MdOutlineDragIndicator />
        </div>
    </Paper>
}

export default Client;