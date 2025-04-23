import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Busqueda from './Busqueda';
import '../App.css';

function EstudiantesList() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/estudiantes');
      setEstudiantes(response.data);
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
      alert('Error al cargar los estudiantes');
    }
  };

  const eliminarEstudiante = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este estudiante?')) {
      try {
        await axios.delete(`http://localhost:3000/api/estudiantes/${id}`);
        cargarEstudiantes();
      } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        alert('Error al eliminar el estudiante');
      }
    }
  };

  const estudiantesFiltrados = estudiantes.filter(
    (estudiante) =>
      estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.apellido.toLowerCase().includes(busqueda.toLowerCase())
  );

  const estudiantesPorCurso = estudiantesFiltrados.reduce((grupos, estudiante) => {
    const cursoKey = estudiante.curso;
    if (!grupos[cursoKey]) {
      grupos[cursoKey] = [];
    }
    grupos[cursoKey].push(estudiante);
    return grupos;
  }, {});

  const renderTablaEstudiantes = (cursoNombre, estudiantesCurso) => {
    return (
      <div key={cursoNombre} className="curso-table-container">
        <h3>{cursoNombre}</h3>
        <table className="compact-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesCurso.map((estudiante) => (
              <tr key={estudiante.id}>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.apellido}</td>
                <td>
                  <div className="button-group">
                    <button 
                      onClick={() => navigate(`/editar/${estudiante.id}`)}
                      className="btn-edit btn-small"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => eliminarEstudiante(estudiante.id)}
                      className="btn-delete btn-small"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Lista de Estudiantes</h2>
      
      <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />

      <div className="curso-grid">
        {Object.keys(estudiantesPorCurso).length === 0 ? (
          <p>No se encontraron estudiantes con los criterios de búsqueda.</p>
        ) : (
          Object.entries(estudiantesPorCurso).map(([curso, estudiantesCurso]) => 
            renderTablaEstudiantes(curso, estudiantesCurso)
          )
        )}
      </div>
    </div>
  );
}

export default EstudiantesList;