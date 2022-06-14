import bcrypt from 'bcrypt';
import db from '../database/database.js';

async function GetUserEmail(email) {
  return db.query('SELECT * FROM users WHERE email = $1', [email]);
}

async function GetUserName(name) {
  return db.query('SELECT * FROM users WHERE username = $1', [name]);
}

async function CreateUser(name, email, password, default_picture) {
  const hash = bcrypt.hashSync(password, 10);
  return db.query(
    'INSERT INTO users (username, email, password, picture) VALUES ($1, $2, $3, $4)',
    [name, email, hash, default_picture]
  );
}

async function CreateSession(token, userId, expiration) {
  return db.query(
    'INSERT INTO sessions (token, "userId", "expiration") VALUES ($1, $2, $3)',
    [token, userId, expiration]
  );
}

const AuthenticationRepository = {
  GetUserEmail,
  GetUserName,
  CreateUser,
  CreateSession,
};

export default AuthenticationRepository;
