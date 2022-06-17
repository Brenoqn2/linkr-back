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

function UpdateUserAvatar(userId, avatar) {
  return db.query(
    `--sql
      UPDATE 
        users
      SET 
        picture = $2
      WHERE 
        id = $1
    `,
    [userId, avatar]
  );
}

const UserRepository = {
  getUserByToken,
  UpdateUserAvatar,
};

export default UserRepository;
