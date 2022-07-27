import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueris';
import { IClient, IClientsData } from '../types/client.interface';

interface IClientRowProps {
  client: IClient;
}

const ClientRow = ({ client }: IClientRowProps) => {
  const [deleteClient] = useMutation<{ deleteClient: IClient }, { id: string }>(DELETE_CLIENT, {
    variables: {
      id: client.id,
    },
    update(cache, { data }) {
      if (!data || !data.deleteClient) return;

      const allClients = cache.readQuery<IClientsData>({
        query: GET_CLIENTS,
      });

      if (!allClients) return;

      cache.writeQuery<IClientsData>({
        query: GET_CLIENTS,
        data: {
          clients: allClients.clients.filter((client) => client.id !== data.deleteClient.id),
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
