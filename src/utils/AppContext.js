import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {

    const [state, setState] = useState('something');

    const host = process.env.REACT_APP_SNAPCAST_HOST;
    const ws = new WebSocket(`${host}/jsonrpc`);
    const request = {
        'id': 0,
        'jsonrpc': '2.0',
        'method': 'Server.GetStatus'
    };

    ws.addEventListener('message', (message) => {
        console.log(JSON.parse(message.data)); // {"id":4,"jsonrpc":"2.0","result":{"major":2,"minor":0,"patch":0}}
    });
    ws.addEventListener('open', () => ws.send(JSON.stringify(++request.id && request)));

    return (
        <AppContext.Provider
            value={{
                state
            }}
        >
            {children}
        </AppContext.Provider>)
}