const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User")

const registerController = async (request, response) => {

    const { email, username, password } = request.body

    try {

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return response.status(400).json({ message: 'El email ya existe' });
        }

        // Crea un nuevo usuario
        const newUser = await User.create({
            email,
            username,
            password, // La contraseña se hasheará en el modelo antes de guardar
        });

        const token = jwt.sign({ userId: newUser.id, username: newUser.username }, 'gato', { expiresIn: 24 * 60 * 60 });


        response.status(201).json({ message: 'Registro exitoso', user: newUser, token });

    }catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }

}

const loginController = async (request, response) => {
    const { email, password } = request.body

    try {

        const user = await User.findOne({ where: { email } });

        if (user && bcrypt.compareSync(password, user.password)) {
            // Autenticación exitosa
            const token = jwt.sign({ userId: user.id, username: user.username }, 'gato', { expiresIn: 24 * 60 * 60 });

            response.status(201).json({ message: 'Login exitoso', user, token });
        } else {
            // Autenticación fallida
            response.status(401).json({ message: 'Credenciales inválidas' });
        }

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error en el servidor' });
    }
}
module.exports = {
    loginController,
    registerController
}