require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Habilitar el uso de JSON en las peticiones
app.use(cors()); // Habilitar CORS para permitir peticiones desde el frontend

// Conectar a la base de datos y sincronizar modelos
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // Sincroniza los modelos con la base de datos
    console.log('Modelos de la base de datos sincronizados.');
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
  }
};

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

startServer();
