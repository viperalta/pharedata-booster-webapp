import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Nuevo from './pages/Nuevo';
import Activos from './pages/Activos';
import Finalizados from './pages/Finalizados';
import './App.scss';


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo" element={<Nuevo/>} />
          <Route path="/activos" element={<Activos/>} />
          <Route path="/finalizados" element={<Finalizados/>} />
        </Routes>
      </Layout>
    </Router>
  );
}
