import bcrypt from 'bcrypt';
import db from '../config/database.js';

async function GetUserEmail(email) {
  return db.query('SELECT * FROM users WHERE email = $1', [email]);
}

async function GetUserName(name) {
  return db.query('SELECT * FROM users WHERE username = $1', [name]);
}

async function CreateUser(name, email, password, defaultPicture) {
  const hash = bcrypt.hashSync(password, 10);
  return db.query(
    'INSERT INTO users (username, email, password, picture) VALUES ($1, $2, $3, $4)',
    [name, email, hash, defaultPicture]
  );
}

async function CreateSession(token, userId, expiration) {
  return db.query(
    'INSERT INTO sessions (token, "userId", "expiration") VALUES ($1, $2, $3)',
    [token, userId, expiration]
  );
}

async function EndSession(token) {
  return db.query('DELETE FROM sessions WHERE token = $1', [token]);
}

async function UpdateTokenExpiration(token, expiration) {
  return db.query('UPDATE sessions SET "expiration" = $2 WHERE token = $1', [
    token,
    expiration,
  ]);
}

async function GetUserSessions(email) {
  return db.query(
    `
  SELECT sessions.*, users.email FROM sessions
  JOIN users ON sessions."userId" = users.id
  WHERE users.email = $1`,
    [email]
  );
}

async function DeleteUserSessions(email) {
  return db.query(
    `
  DELETE FROM sessions
  WHERE sessions."userId" IN (
    SELECT users.id FROM users
    WHERE users.email = $1
  )`,
    [email]
  );
}

async function GetUserToken(token) {
  return db.query('SELECT * FROM sessions WHERE token = $1', [token]);
}

const AuthenticationRepository = {
  GetUserEmail,
  GetUserName,
  CreateUser,
  CreateSession,
  EndSession,
  UpdateTokenExpiration,
  GetUserSessions,
  DeleteUserSessions,
};

export default AuthenticationRepository;
