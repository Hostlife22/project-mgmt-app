import { useMutation, useQuery } from '@apollo/client';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { ProjectStatus } from '../../__generated__/globalTypes';
import { ADD_PROJECT } from '../apollo/mutations/projectMutation';
import { addProject, addProjectVariables } from '../apollo/mutations/__generated__/addProject';
import { GET_CLIENTS } from '../apollo/queries/clientQueris';
import { GET_PROJECTS } from '../apollo/queries/projectQueris';
import { getClients } from '../apollo/queries/__generated__/getClients';
import { getProjects } from '../apollo/queries/__generated__/getProjects';

interface IInputState {
  name: string;
  description: string;
  clientId: string;
  status: ProjectStatus;
}

const AddProjectModal = () => {
  const [inputValues, setInputValues] = useState<IInputState>({
    name: '',
    description: '',
    clientId: '',
    status: ProjectStatus.new,
  });

  const { loading, error, data } = useQuery<getClients>(GET_CLIENTS);
  const [addProject] = useMutation<addProject, addProjectVariables>(ADD_PROJECT, {
    variables: inputValues,
    update(cache, { data }) {
      if (!data || !data.addProject) return;

      const allProjects = cache.readQuery<getProjects>({ query: GET_PROJECTS });

      cache.writeQuery<getProjects>({
        query: GET_PROJECTS,
        data: {
          projects:
            allProjects && allProjects.projects
              ? allProjects.projects.concat([data.addProject])
              : null,
        },
      });
    },
  });

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newValue = event.target.value;
      const inputName = event.target.name;
      setInputValues((prev) => ({ ...prev, [inputName]: newValue }));
    },
    [],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(inputValues).some((value) => value === '')) {
      return alert('Please fill all fields');
    }

    addProject();
    setInputValues({ name: '', description: '', clientId: '', status: ProjectStatus.new });
  };

  if (loading) return null;
  if (error) return <p>Somithing Went Wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    New Project
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
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={inputValues.description}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        id="status"
                        className="form-select"
                        value={inputValues.status}
                        onChange={handleOnChange}>
                        <option value={ProjectStatus.new}>Not Started</option>
                        <option value={ProjectStatus.progress}>In Progress</option>
                        <option value={ProjectStatus.completed}>Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        name="clientId"
                        id="clientId"
                        className="form-select"
                        value={inputValues.clientId}
                        onChange={handleOnChange}>
                        <option value="">Select Client</option>
                        {data?.clients?.map(
                          (client) =>
                            client &&
                            client.id && (
                              <option key={client.id} value={client.id}>
                                {client.name}
                              </option>
                            ),
                        )}
                      </select>
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
