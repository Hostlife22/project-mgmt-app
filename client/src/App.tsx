import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
