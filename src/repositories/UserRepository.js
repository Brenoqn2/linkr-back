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

function getUserById(id) {
  return db.query(
    `--sql
      SELECT * FROM USERS
      WHERE id = $1
    `,
    [id]
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

function getUserPosts(id, page) {
  let offset = page ? (page - 1) * 10 : 0;
  if (offset < 0) offset = 0;

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
      OFFSET $2
      LIMIT 10
    `,
    [id, offset]
  );
}

function getUsersByName(name, userId) {
  name += '%'; // eslint-disable-line
  return db.query(
    `--sql
      SELECT 
        USERS.USERNAME,
        USERS.ID,
        (CASE WHEN F."followerId" = $1 THEN true ELSE false END) AS "isFollowing",
        USERS.PICTURE
      FROM USERS
      LEFT JOIN FOLLOWERS F ON F."followingId" = USERS.ID AND F."followerId" = $1 
      WHERE USERNAME ILIKE $2
      ORDER BY "isFollowing" DESC, username
    `,
    [userId, name]
  );
}

const UserRepository = {
  getUserByToken,
  getUserById,
  UpdateUserAvatar,
  getUserByPostId,
  getUserPosts,
  getUsersByName,
};

export default UserRepository;
