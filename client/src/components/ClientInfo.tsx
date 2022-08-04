import { FaEnvelope, FaIdBadge, FaPhone } from 'react-icons/fa';
import { getProject_project_client } from '../apollo/queries/__generated__/getProject';

interface IClientInfoProps {
  client: getProject_project_client;
}

const ClientInfo = ({ client: { name, email, phone } }: IClientInfoProps) => {
  return (
    <>
      <h5 className="mt-5">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" /> {name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" /> {email}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" /> {phone}
        </li>
      </ul>
    </>
  );
};

export default ClientInfo;
