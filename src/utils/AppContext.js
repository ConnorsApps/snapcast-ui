import { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { EVENTS, REQUESTS } from './Constants.js';
import { clientsReducer, groupsReducer, stateFromStatus, streamsReducer } from './Reducer.js';
import { requests, connectToSnapcastServer, WEBSOCKET_STATUS, sendRequest } from './WebSocket.js';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(WEBSOCKET_STATUS.connecting);

    const [server, setServer] = useState([]);
    const [groups, disbatchGroups] = useReducer(groupsReducer, {});
    const [streams, disbatchStreams] = useReducer(streamsReducer, {});
    const [clients, disbatchClients] = useReducer(clientsReducer, {});

    const onMessage = useCallback((message) => {
        const data = JSON.parse(message.data);
        const isRequest = data.id !== undefined;

        if (isRequest) {
            const event = requests[data.id];
            const result = data.result;

            if (event === REQUESTS.server.getStatus) {
                const { server, streams, groups, clients } = stateFromStatus(result);
                setServer(server);

                disbatchStreams({ type: 'init', streams });
                disbatchGroups({ type: 'init', groups });
                disbatchClients({ type: 'init', clients });

                setIsLoading(false);
            }
        } else {
            const event = data.method;
            const params = data.params;

            if (event === EVENTS.client.onVolumeChanged) {
                disbatchClients({ type: event, params });

            } else {
                console.log("event", event);
            }
        }
    }, [disbatchStreams, disbatchGroups, disbatchClients, setIsLoading]);

    useEffect(() => {
        console.log('On status change',status);
        
        if (status === WEBSOCKET_STATUS.open) {
            sendRequest(REQUESTS.server.getStatus, null, true);
        }
    }, [status]);

    // useEffect(() => {
    //     const interval = setInterval(() => setWebSocketStatus(getWebsocketStatus()), 3000);

    //     // Refresh current state and create new websocket when browser comes back into focus
    //     window.addEventListener('focus', () => {
    //         createNewWebsocket();
    //         setInit(false);
    //         setIsLoading(true);
    //     });

    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        connectToSnapcastServer(0, onMessage, setStatus)
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
                webSocketStatus: status
            }}
        >
            {children}
        </AppContext.Provider>)
}