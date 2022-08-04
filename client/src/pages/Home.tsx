import Client from '../components/Client';
import Modal from '../components/Modal';
import Project from '../components/Project';

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <Modal />
      </div>
      <Project />
      <hr />
      <Client />
    </>
  );
};

export default Home;
