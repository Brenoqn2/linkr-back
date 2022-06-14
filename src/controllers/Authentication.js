import bcrypt from 'bcrypt';
import { TokenGenerator } from 'tk-generator';

import AuthenticationRepository from '../repositories/Authentication.js';

export async function PostSignupController(req, res) {

    const default_picture = 'https://i.imgur.com/62ufJYt.jpeg';
    const { name, email, password } = req.body;

    try {

        const ValidateEmail = await AuthenticationRepository.GetUserEmail(email);
        if (ValidateEmail.rowCount > 0) return res.status(409).send('this email has already been registered');

        const ValidateName = await AuthenticationRepository.GetUserName(name);
        if (ValidateName.rowCount > 0) return res.status(422).send('this name has already been registered');

        AuthenticationRepository.CreateUser(name, email, password, default_picture);
        res.status(201).send('user created successfully');

    } catch (err) { return res.status(500).send(`Error accessing database during PostSignupController.\n${err}`); }
}

export async function PostSigninController(req, res) {

    const { email, password } = req.body;

    try {

        const ValidateEmail = await AuthenticationRepository.GetUserEmail(email);
        if (ValidateEmail.rowCount === 0) return res.status(401).send('this email has not been registered');

        const ValidatePassword = bcrypt.compareSync(password, ValidateEmail.rows[0].password);
        if (!ValidatePassword) return res.status(401).send('invalid password');

        const token = TokenGenerator(ValidateEmail.rows[0].name, `${Date.now()}`);
        // expiration vai ser o tempo atual em milisegundos + o tempo de expiração em milisegundos ( 4 horas )
        const expiration = Date.now() + (4 * 60 * 60 * 1000);
        AuthenticationRepository.CreateSession(token, ValidateEmail.rows[0].id, expiration);
        res.status(200).send(token);

    } catch (err) { return res.status(500).send(`Error accessing database during PostSigninController.\n${err}`); }
}