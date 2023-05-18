import { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { EVENTS, INTERNAL_VOLUMES, REQUESTS } from './Constants.js';
import { internalVolumesReducer, isLoopbackVolumeUpdate, reducer, streamsReducer } from './Reducer.js';
import { requests, connectToSnapcastServer, WEBSOCKET_STATUS, sendRequest } from './WebSocket.js';

export const AppContext = createContext();

export const AppContextProvider = ({ children, theme }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(WEBSOCKET_STATUS.connecting);

    const [server, setServer] = useState([]);
    const [groups, disbatch] = useReducer(reducer, {});
    const [streams, disbatchStreams] = useReducer(streamsReducer, {});
    const [internalVolumes, disbatchInternalVolumes] = useReducer(internalVolumesReducer, {});

    const onServerUpdate = (update) => {
        setServer(update.server.server);

        disbatchStreams({ type: 'init', streams: update.server.streams });
        disbatch({ type: 'init', groups: update.server.groups });
        disbatchInternalVolumes({ type: 'init', groups: update.server.groups })

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
            } else if (event.startsWith('Group.On') || event.startsWith('Client.On')) {
                disbatch({ type: event, params });
                if (event === EVENTS.client.onVolumeChanged) {
                    const isLoopback = isLoopbackVolumeUpdate(params);
                    console.log('isLoopback', isLoopback);
                    if (!isLoopback) {
                        disbatchInternalVolumes({
                            type: INTERNAL_VOLUMES.client.update,
                            clientId: params.id,
                            volume: params.volume,
                        });
                    }
                }
            } else if (event.startsWith('Stream.On')) {
                disbatchStreams({ type: event, params });
            }

        }

    }, [disbatchStreams, disbatch]);

    useEffect(() => {
        console.debug('Websocket status', status);

        if (status === WEBSOCKET_STATUS.open) {
            sendRequest(REQUESTS.server.getStatus, null, true);
        } else if (status === WEBSOCKET_STATUS.failed) {
            setIsLoading(false);
        }
    }, [status]);

    // useEffect(() => {
    // Refresh current state and create new websocket when browser comes back into focus
    // window.addEventListener('focus', () => {
    //     connectToSnapcastServer(onMessage, setStatus);
    // });
    // }, [onMessage]);

    useEffect(() => {
        connectToSnapcastServer(onMessage, setStatus);
    }, [onMessage, setStatus]);

    return (
        <AppContext.Provider
            value={{
                streams,
                server,
                groups,
                isLoading,
                disbatchStreams,
                disbatch,
                webSocketStatus: status,
                theme,
                status,
                internalVolumes,
                disbatchInternalVolumes
            }}
        >
            {children}
        </AppContext.Provider>)
}