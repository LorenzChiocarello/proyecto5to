import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Busqueda from './Busqueda';

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

  return (
    <div className="container">
      <h2>Lista de Estudiantes</h2>
      
      <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesFiltrados.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{new Date(estudiante.fechanacimiento).toLocaleDateString()}</td>
              <td>{estudiante.curso}</td>
              <td>
                <button 
                  onClick={() => navigate(`/editar/${estudiante.id}`)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarEstudiante(estudiante.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstudiantesList;
