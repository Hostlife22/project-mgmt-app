import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueris';
import { IClientsData } from '../types/client.interface';
import ClientRow from './ClientRow';
import Spinner from './Spinner';

const Client = () => {
  const { loading, error, data } = useQuery<IClientsData>(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Somithing Went Wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Client;
