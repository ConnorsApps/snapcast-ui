import { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { EVENTS, REQUESTS } from './Constants.js';
import { groupsReducer, streamsReducer, clientsReducer, ws, requests, sendRequest } from './WebSocket.js';


const stateFromStatus = (result) => {
    const server = result.server.server;

    const streams = {};
    result.server.streams.map(stream => streams[stream.id] = stream);

    const groups = {};
    result.server.groups.map(group => groups[group.id] = group);

    const clients = {};
    result.server.groups.forEach(group => group.clients.forEach(client => {
        clients[client.id] = { ...client, groupId: group.id }
    }));

    return { server, streams, groups, clients };
}

const waitForWebsocket = (ws, callback, iterations) => {
    ws.onerror = (event) => {
        return callback({ error: true, message: 'Unable to connect to server' + JSON.stringify(event) });
    };

    if (iterations > 10) {
        return callback({ error: true, message: 'Unable to connect to server' });
    }
    setTimeout(() => {
        if (ws.readyState === 1) {
            callback({ error: false });
        } else {
            waitForWebsocket(ws, callback, ++iterations);
        }
    }, 500)
}

export const WEBSOCKET_STATUS = {
    connecting: 'connecting',
    open: 'open',
    failed: 'failed'
}

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [init, setInit] = useState(false);
    const [server, setServer] = useState([]);
    const [groups, disbatchGroups] = useReducer(groupsReducer, {});
    const [streams, disbatchStreams] = useReducer(streamsReducer, {});
    const [clients, disbatchClients] = useReducer(clientsReducer, {});
    const [webSocketStatus, setWebSocketStatus] = useState(WEBSOCKET_STATUS.connecting)

    const onServerRequest = useCallback((message) => {
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
        setInit(true);
        // Work around to connect to websocket with hooks
        if (!init) {
            waitForWebsocket(ws, ({ error, message }) => {
                if (!error) {
                    setWebSocketStatus(WEBSOCKET_STATUS.open);
                    sendRequest(REQUESTS.server.getStatus, null, true);
                    ws.addEventListener('message', onServerRequest);
                } else {
                    console.error(message);
                    setIsLoading(false);
                    setWebSocketStatus(WEBSOCKET_STATUS.failed);
                }
            }, 0);
        }

    }, [init, onServerRequest]);

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
                webSocketStatus,
            }}
        >
            {children}
        </AppContext.Provider>)
}