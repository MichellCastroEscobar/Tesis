const { Sequelize } = require('sequelize');

// Usamos variables de entorno para la configuración de la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Desactiva los logs de SQL en la consola
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos PostgreSQL exitosa.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Sale de la aplicación si hay un error de conexión
  }
};

module.exports = { sequelize, connectDB };
