const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantes');
const cursosRoutes = require('./routes/cursos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/cursos', cursosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});