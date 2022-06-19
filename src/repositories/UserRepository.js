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

function getUserByPostId(postId) {
  return db.query(
    `--sql
      SELECT p."userId"
      FROM posts p 
      WHERE p.id = $1
    `,
    [postId]
  );
}

function getUserPosts(id) {
  return db.query(
    `--sql
      SELECT 
        POSTS.*, 
        USERS.username, 
        USERS.picture 
      FROM POSTS
      JOIN 
        USERS ON USERS.id = POSTS."userId"
      WHERE 
        "userId" = $1
      ORDER BY POSTS."createdAt" DESC
    `,
    [id]
  );
}

function getUsersByName(name) {
  name += '%';
  console.log(name);
  return db.query(
    `--sql
      SELECT USERS.username, USERS.id, USERS.picture FROM USERS
      WHERE username ILIKE $1
    `,
    [name]
  );
}

const UserRepository = {
  getUserByToken,
  UpdateUserAvatar,
  getUserByPostId,
  getUserPosts,
  getUsersByName,
};

export default UserRepository;
