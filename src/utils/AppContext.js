import { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { EVENTS, REQUESTS } from './Constants.js';
import { clientsReducer, groupsReducer, stateFromStatus, streamsReducer } from './Reducer.js';
import { ws, requests, sendRequest, createNewWebsocket, getWebsocketStatus, WEBSOCKET_STATUS } from './WebSocket.js';

const waitForWebsocket = (ws, callback, iterations) => {
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

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [init, setInit] = useState(false);
    const [failed, setFailed] = useState(false);
    const [webSocketStatus, setWebSocketStatus] = useState(WEBSOCKET_STATUS.connecting);

    const [server, setServer] = useState([]);
    const [groups, disbatchGroups] = useReducer(groupsReducer, {});
    const [streams, disbatchStreams] = useReducer(streamsReducer, {});
    const [clients, disbatchClients] = useReducer(clientsReducer, {});

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
                    setFailed(true);
                }
            }, 0);
        }

    }, [init, onServerRequest]);

    useEffect(() => {
        const interval = setInterval(() => setWebSocketStatus(getWebsocketStatus()), 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
        const createNewSocket = webSocketStatus === WEBSOCKET_STATUS.closed && init === true;

        if (createNewSocket) {
            createNewWebsocket();
        }
        setInit(createNewSocket ? false : init);
        setIsLoading(createNewSocket ? true : isLoading);

    }, [webSocketStatus, init, isLoading]);

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
                failed,
            }}
        >
            {children}
        </AppContext.Provider>)
}