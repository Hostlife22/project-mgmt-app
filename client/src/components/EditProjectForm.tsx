import { useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { ProjectStatus, ProjectStatusUpdate } from '../../__generated__/globalTypes';
import { UPDATE_PROJECT } from '../apollo/mutations/projectMutation';
import {
  updateProject,
  updateProjectVariables,
} from '../apollo/mutations/__generated__/updateProject';
import { GET_PROJECTS } from '../apollo/queries/projectQueris';
import { getProject_project } from '../apollo/queries/__generated__/getProject';
import { getProjects } from '../apollo/queries/__generated__/getProjects';
import { getEnumKeyByEnumValue } from '../utils';

interface IEditProjectFormProps {
  project: getProject_project;
}

interface IInputState {
  name: string;
  description: string;
  status: ProjectStatusUpdate;
}

export enum ProjectStatusValues {
  completed = 'Completed',
  new = 'Not Started',
  progress = 'In Progress',
}

const EditProjectForm = ({ project }: IEditProjectFormProps) => {
  const [inputValues, setInputValues] = useState<IInputState>({
    name: project.name || '',
    description: project.description || '',
    status:
      (getEnumKeyByEnumValue(ProjectStatusValues, project.status || '') as ProjectStatusUpdate) ||
      ProjectStatusUpdate.new,
  });

  const [updateProject] = useMutation<updateProject, updateProjectVariables>(UPDATE_PROJECT, {
    variables: { id: project.id || '', ...inputValues },
    update(cache, { data }) {
      if (!data || !data.updateProject) return;

      const allProjects = cache.readQuery<getProjects>({ query: GET_PROJECTS });

      cache.writeQuery<getProjects>({
        query: GET_PROJECTS,
        data: {
          projects:
            allProjects && allProjects.projects
              ? allProjects.projects.map((project) =>
                  project?.id === data.updateProject?.id ? data.updateProject : project,
                )
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

    updateProject();
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
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

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default EditProjectForm;
