import { Tooltip } from '@mui/material';
import './ConnectionIcon.scss';
import { MdOutlineSignalCellularConnectedNoInternet0Bar, MdOutlineSignalCellularAlt } from 'react-icons/md';

const ConnectionIcon = ({ conencted }) => (
    <div className='connectionIcon'>
        {conencted && (
            <Tooltip
                className='tooltip'
                title='Connected'
                disableInteractive
            >
                <div>
                    <MdOutlineSignalCellularAlt className='connected' />
                </div>
            </Tooltip>
        )}
        {!conencted && (
            <Tooltip
                className='tooltip'
                title='Disconnected'
                disableInteractive
            >
                <div>
                    <MdOutlineSignalCellularConnectedNoInternet0Bar className='disconnected' />
                </div>
            </Tooltip>
        )}
    </div>
);

export default ConnectionIcon;