import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../apollo/queries/projectQueris';
import { getProject, getProjectVariables } from '../apollo/queries/__generated__/getProject';
import ClientInfo from '../components/ClientInfo';
import Spinner from '../components/Spinner';

type ProjectParamsType = {
  id?: string;
};

const Project = () => {
  const { id } = useParams<ProjectParamsType>();
  const { loading, error, data } = useQuery<getProject, getProjectVariables>(GET_PROJECT, {
    variables: { id: id || '' },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Somithing Went Wrong...</p>;

  return (
    <>
      {!loading && !error && data && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data.project?.name}</h1>
          <p>{data.project?.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project?.status}</p>
          {data.project?.client && <ClientInfo client={data.project.client} />}
        </div>
      )}
    </>
  );
};

export default Project;
