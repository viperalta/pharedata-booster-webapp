import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Nuevo from './pages/Nuevo';
import Activos from './pages/Activos';
import Finalizados from './pages/Finalizados';
import Planes from './pages/Planes';
import Contacto from './pages/Contacto'
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
          <Route path="/planes" element={<Planes/>} />
          <Route path="/contacto" element={<Contacto/>} />
        </Routes>
      </Layout>
    </Router>
  );
}
