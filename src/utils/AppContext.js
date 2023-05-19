import { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { REQUESTS } from './Constants.js';
import { clientsReducer, groupsReducer, streamsReducer } from './Reducer.js';
import { requests, connectToSnapcastServer, WEBSOCKET_STATUS, sendRequest } from './WebSocket.js';

export const AppContext = createContext();

export const AppContextProvider = ({ children, theme }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(WEBSOCKET_STATUS.connecting);

    const [server, setServer] = useState([]);
    const [groups, disbatchGroups] = useReducer(groupsReducer, {});
    const [streams, disbatchStreams] = useReducer(streamsReducer, {});
    const [clients, disbatchClients] = useReducer(clientsReducer, {});

    const onServerUpdate = (update) => {
        setServer(update.server.server);

        disbatchStreams({ type: 'init', streams: update.server.streams });
        disbatchGroups({ type: 'init', groups: update.server.groups });
        disbatchClients({ type: 'init', groups: update.server.groups });

        setIsLoading(false);
    }

    const onMessage = useCallback((message) => {
        const data = JSON.parse(message.data);

        const isRequestResponse = data.id !== undefined;
        if (isRequestResponse) {
            const event = requests[data.id];
            if (event === REQUESTS.server.getStatus) {
                onServerUpdate(data.result);
            }
        } else {
            const event = data.method;
            const params = data.params;

            if (event === 'Server.OnUpdate') {
                onServerUpdate(params);
            } else if (event.startsWith('Group.On')) {
                disbatchGroups({ type: event, params });
            } else if (event.startsWith('Client.On')) {
                disbatchClients({ type: event, params });
            } else if (event.startsWith('Stream.On')) {
                disbatchStreams({ type: event, params });
            }

        }

    }, [disbatchStreams, disbatchGroups]);

    useEffect(() => {
        console.debug('Websocket status', status);

        if (status === WEBSOCKET_STATUS.open) {
            sendRequest(REQUESTS.server.getStatus, null, true);
        } else if (status === WEBSOCKET_STATUS.failed) {
            setIsLoading(false);
        }
    }, [status]);

    useEffect(() => {
        // Refresh current state and create new websocket when browser comes back into focus
        window.addEventListener('focus', () => {
            sendRequest(REQUESTS.server.getStatus, null, true);
        });
    }, []);

    useEffect(() => {
        connectToSnapcastServer(onMessage, setStatus);
    }, [onMessage, setStatus]);

    return (
        <AppContext.Provider
            value={{
                streams,
                server,
                groups,
                clients,
                isLoading,
                disbatchStreams,
                disbatchGroups,
                disbatchClients,
                webSocketStatus: status,
                theme,
                status,
            }}
        >
            {children}
        </AppContext.Provider>)
}