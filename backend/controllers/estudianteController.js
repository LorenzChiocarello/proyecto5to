const pool = require('../config/database');

const estudianteController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query(
                `SELECT e.*, c.curso 
                FROM Estudiantes e 
                LEFT JOIN Cursos c ON e.idcurso = c.id
                ORDER BY c.curso asc`
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const [rows] = await pool.query(
                `SELECT e.*, c.curso 
                FROM Estudiantes e 
                LEFT JOIN Cursos c ON e.idcurso = c.id 
                WHERE e.id = ?`,
                [req.params.id]
            );
            
            if (rows.length === 0) {
                return res.status(404).json({ message: "Estudiante no encontrado" });
            }
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { nombre, apellido, fechanacimiento, idcurso } = req.body;
            const [result] = await pool.query(
                'INSERT INTO Estudiantes (nombre, apellido, fechanacimiento, idcurso) VALUES (?, ?, ?, ?)',
                [nombre, apellido, fechanacimiento, idcurso]
            );
            res.status(201).json({ 
                id: result.insertId,
                nombre,
                apellido,
                fechanacimiento,
                idcurso
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { nombre, apellido, fechanacimiento, idcurso } = req.body;
            const [result] = await pool.query(
                'UPDATE Estudiantes SET nombre = ?, apellido = ?, fechanacimiento = ?, idcurso = ? WHERE id = ?',
                [nombre, apellido, fechanacimiento, idcurso, req.params.id]
            );
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Estudiante no encontrado" });
            }
            res.json({ message: "Estudiante actualizado exitosamente" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM Estudiantes WHERE id = ?', [req.params.id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Estudiante no encontrado" });
            }
            res.json({ message: "Estudiante eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = estudianteController;