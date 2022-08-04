import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../apollo/mutations/clientMutations';
import {
  deleteClient,
  deleteClientVariables,
} from '../apollo/mutations/__generated__/deleteClient';

import { GET_CLIENTS } from '../apollo/queries/clientQueris';
import { getClients, getClients_clients } from '../apollo/queries/__generated__/getClients';

interface IClientRowProps {
  client: getClients_clients;
}

const ClientRow = ({ client }: IClientRowProps) => {
  const [deleteClient] = useMutation<deleteClient, deleteClientVariables>(DELETE_CLIENT, {
    variables: {
      id: String(client.id),
    },
    update(cache, { data }) {
      if (!data || !data.deleteClient) return;

      const allClients = cache.readQuery<getClients>({
        query: GET_CLIENTS,
      });

      cache.writeQuery<getClients>({
        query: GET_CLIENTS,
        data: {
          clients:
            allClients && allClients.clients
              ? allClients.clients.filter((client) => client?.id !== data.deleteClient?.id)
              : null,
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteClient()}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
