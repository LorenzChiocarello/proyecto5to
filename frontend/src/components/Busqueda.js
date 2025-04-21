import React from 'react';
import '../App.css';

function Busqueda({ busqueda, setBusqueda }) {
  return (
    <div className="busqueda-container">
      <input
        type="text"
        placeholder="Buscar por nombre o apellido..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default Busqueda;
