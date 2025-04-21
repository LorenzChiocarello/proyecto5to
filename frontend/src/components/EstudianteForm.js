import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EstudianteForm() {
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechanacimiento: '',
    idcurso: ''
  });
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    cargarCursos();
    if (id) {
      cargarEstudiante();
    }
  }, [id]);

  const cargarCursos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cursos');
      setCursos(response.data);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
      alert('Error al cargar los cursos');
    }
  };

  const cargarEstudiante = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/estudiantes/${id}`);
      const estudiante = response.data;
      setFormData({
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        fechanacimiento: estudiante.fechanacimiento.split('T')[0],
        idcurso: estudiante.idcurso
      });
    } catch (error) {
      console.error('Error al cargar estudiante:', error);
      alert('Error al cargar el estudiante');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/estudiantes/${id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/estudiantes', formData);
      }
      navigate('/lista');
    } catch (error) {
      console.error('Error al guardar estudiante:', error);
      alert('Error al guardar el estudiante');
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechanacimiento"
            value={formData.fechanacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Curso:</label>
          <select
            name="idcurso"
            value={formData.idcurso}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>
                {curso.curso}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn-submit">
            {id ? 'Actualizar' : 'Crear'} Estudiante
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="btn-cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EstudianteForm;