import './ErrorConnecting.scss';
import { Button, Paper } from '@mui/material';

const ErrorConnecting = () => (
    <div className='errorConnecting'>
        <Paper className='message'>
            <p>
                Failed to connect to audio system
            </p>
        </Paper>
        <Button
            variant="contained"
            color="secondary"
            className='button'
            onClick={() => window.location.reload()}
        >
            Reconnect
        </Button>
    </div>
);

export default ErrorConnecting;