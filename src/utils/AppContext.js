import { createContext, useEffect, useState } from "react";

const host = process.env.REACT_APP_SNAPCAST_HOST;
const ws = new WebSocket(`${host}/jsonrpc`);
const request = {
    'id': 0,
    'jsonrpc': '2.0',
    'method': 'Server.GetStatus'
};

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [streams, setStreams] = useState();
    const [server, setServer] = useState();
    const [groups, setGroups] = useState();

    useEffect(() => {
        ws.addEventListener('message', (message) => {
            const data = JSON.parse(message.data).result.server;
            console.log(data); // {"id":4,"jsonrpc":"2.0","result":{"major":2,"minor":0,"patch":0}}

            setStreams(data.streams);
            setServer(data.server);
            setGroups(data.groups);

            setIsLoading(false);
        });

        ws.addEventListener('open', () => ws.send(JSON.stringify(++request.id && request)));
    }, []);

    return (
        <AppContext.Provider
            value={{
                streams,
                server,
                groups,
                isLoading,
            }}
        >
            {children}
        </AppContext.Provider>)
}