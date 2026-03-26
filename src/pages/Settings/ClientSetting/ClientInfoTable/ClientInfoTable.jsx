import './ClientInfoTable.scss';
import { formatDistance } from 'date-fns';

const lastSeen = (secondsSince) => formatDistance(new Date(secondsSince * 1000), new Date(), { addSuffix: true });

const ClientInfoTable = ({ client, showInfo }) => (
    <div className={`infoTable ${showInfo ? 'infoTableOpen' : ''}`}>
        <table>
            <tbody>
                <tr>
                    <th> Host: </th>
                    <td>{client.host.name}</td>
                </tr>
                <tr>
                    <th> IP: </th>
                    <td>{client.host.ip}</td>
                </tr>
                <tr>
                    <th> Mac: </th>
                    <td> {client.host.mac} </td>
                </tr>
                <tr>
                    <th> Instance Id: </th>
                    <td>{client.config.instance}</td>
                </tr>
                <tr>
                    <th> Connected </th>
                    <td> {lastSeen(client.lastSeen.sec)} </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ClientInfoTable;