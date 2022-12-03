import { createContext, useEffect, useReducer, useState } from 'react';
import { EVENTS, REQUESTS } from './Constants.js';
import { groupsReducer, streamsReducer, ws, requests } from './WebSocket.js';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [server, setServer] = useState([]);
    const [groups, disbatchGroups] = useReducer(groupsReducer, {});
    const [streams, disbatchStreams] = useReducer(streamsReducer, {});

    useEffect(() => {
        ws.addEventListener('message', (message) => {
            const data = JSON.parse(message.data);
            const isRequest = data.id !== undefined;

            if (isRequest) {
                const event = requests[data.id];
                const result = data.result;

                if (event === REQUESTS.server.getStatus) {
                    const streams = {};

                    result.server.streams.map(stream => streams[stream.id] = stream);

                    setServer(result.server.server);
                    disbatchStreams({ type: 'init', streams });
                    disbatchGroups({ type: 'init', groups: result.server.groups });

                    setIsLoading(false);
                }
            } else {
                const event = data.method;
                const params = data.params;

                if (EVENTS.client.onVolumeChanged) {
                    console.log('params', params);

                } else {
                    console.log("event", event);
                }
            }
        });

        ws.onerror = (event) => console.error(event);
    }, []);

    return (
        <AppContext.Provider
            value={{
                streams,
                server,
                groups,
                isLoading,
                disbatchStreams,
                disbatchGroups,
            }}
        >
            {children}
        </AppContext.Provider>)
}