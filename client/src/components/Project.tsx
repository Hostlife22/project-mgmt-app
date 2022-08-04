import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../apollo/queries/projectQueris';
import { getProjects } from '../apollo/queries/__generated__/getProjects';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

const Project = () => {
  const { loading, error, data } = useQuery<getProjects>(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Somithing Went Wrong...</p>;

  return (
    <>
      {data && data.projects && data.projects.length > 0 ? (
        <div className="row mt-5">
          {data.projects.map(
            (project) => project && <ProjectCard key={project.id} project={project} />,
          )}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Project;
