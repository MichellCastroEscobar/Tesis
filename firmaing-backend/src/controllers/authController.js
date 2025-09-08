const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
const register = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe (por email o username)
        console.log('Buscando usuario existente...');
        const userExists = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email },
                    { username }
                ]
            }
        });
        if (userExists) {
            console.log('Usuario ya existe');
            const field = userExists.email === email ? 'email' : 'nombre de usuario';
            return res.status(400).json({ message: `El ${field} ya está en uso` });
        }

        // Hash de la contraseña
        console.log('Hasheando contraseña...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            });
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ 
            message: 'Error en el servidor', 
            error: error.message,
            stack: error.stack
        });
    }
};

// @desc    Autenticar usuario y generar token
// @route   POST /api/auth/login
const login = async (req, res) => {
    try {
        console.log('Intento de login - Datos recibidos:', req.body);
        const { email, password } = req.body;

        // Buscar usuario por email
        console.log('Buscando usuario con email:', email);
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        console.log('Usuario encontrado, verificando contraseña');
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            console.log('Login exitoso');
            res.json({
                id: user.id,
                username: user.username,
                email: user.email
            });
        } else {
            console.log('Contraseña incorrecta');
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

module.exports = {
    register,
    login
};
