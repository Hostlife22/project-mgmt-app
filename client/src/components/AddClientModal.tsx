import { useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../apollo/mutations/clientMutations';
import { addClient, addClientVariables } from '../apollo/mutations/__generated__/addClient';
import { GET_CLIENTS } from '../apollo/queries/clientQueris';
import { getClients } from '../apollo/queries/__generated__/getClients';

interface IInputState {
  name: string;
  email: string;
  phone: string;
}

const AddClientModal = () => {
  const [inputValues, setInputValues] = useState<IInputState>({
    name: '',
    email: '',
    phone: '',
  });

  const [addClient] = useMutation<addClient, addClientVariables>(ADD_CLIENT, {
    variables: inputValues,
    update(cache, { data }) {
      if (!data || !data.addClient) return;

      const allClients = cache.readQuery<getClients>({ query: GET_CLIENTS });

      cache.writeQuery<getClients>({
        query: GET_CLIENTS,
        data: {
          clients:
            allClients && allClients.clients ? allClients.clients.concat([data.addClient]) : null,
        },
      });
    },
  });

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setInputValues((prev) => ({ ...prev, [inputName]: newValue }));
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(inputValues).every((value) => value === '')) {
      return alert('Please fill all fields');
    }

    addClient();
    setInputValues({ name: '', email: '', phone: '' });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={inputValues.name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={inputValues.email}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={inputValues.phone}
                    onChange={handleOnChange}
                  />
                </div>
                <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
