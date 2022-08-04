import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../apollo/mutations/clientMutations';
import {
  deleteClient,
  deleteClientVariables,
} from '../apollo/mutations/__generated__/deleteClient';

import { GET_CLIENTS } from '../apollo/queries/clientQueris';
import { GET_PROJECTS } from '../apollo/queries/projectQueris';
import { getClients_clients } from '../apollo/queries/__generated__/getClients';

interface IClientRowProps {
  client: getClients_clients;
}

const ClientRow = ({ client }: IClientRowProps) => {
  const [deleteClient] = useMutation<deleteClient, deleteClientVariables>(DELETE_CLIENT, {
    variables: {
      id: String(client.id),
    },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
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
