import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import EstudiantesList from './components/EstudiantesList';
import EstudianteForm from './components/EstudianteForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Estudiantes ProA Las Varillas</h1>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/lista" className="nav-link">Lista de Estudiantes</Link>
          <Link to="/crear" className="nav-link">Nuevo Estudiante</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<EstudiantesList />} />
          <Route path="/crear" element={<EstudianteForm />} />
          <Route path="/editar/:id" element={<EstudianteForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
