const pool = require('../config/database');

const cursoController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Cursos');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = cursoController;