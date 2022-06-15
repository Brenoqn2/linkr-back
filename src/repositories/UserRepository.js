import db from '../config/database.js';

function getUserByToken(token) {
  return db.query(
    `--sql
      SELECT 
        users.*
      FROM 
        users
      JOIN
        sessions s ON s."userId" = users.id
      WHERE s.token = $1
    `,
    [token]
  );
}

const UserRepository = {
  getUserByToken,
};

export default UserRepository;
