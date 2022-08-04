import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../apollo/mutations/projectMutation';
import {
  deleteProject,
  deleteProjectVariables,
} from '../apollo/mutations/__generated__/deleteProject';
import { GET_PROJECTS } from '../apollo/queries/projectQueris';

interface IDeleteProjectButtonProps {
  projectId: string;
}

const DeleteProjectButton = ({ projectId }: IDeleteProjectButtonProps) => {
  const navigate = useNavigate();
  //   const {loading, error, } = useQuery(GET_PROJECTS)
  const [deleteProject] = useMutation<deleteProject, deleteProjectVariables>(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/', { replace: true }),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={() => deleteProject()}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
