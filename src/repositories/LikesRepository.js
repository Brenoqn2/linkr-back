import db from '../config/database.js';

async function LikeThisPost(userId, postId) {
  const result = await db.query(
    `--sql
      INSERT INTO likes ("userId", "postId")
      VALUES ($1, $2)
    `,
    [userId, postId]
  );

  return result.rows;
}

async function UnlikeThisPost(userId, postId) {
  const result = await db.query(
    `--sql
      DELETE FROM likes
      WHERE "userId" = $1
      AND "postId" = $2
    `,
    [userId, postId]
  );

  return result.rows;
}

async function GetLikes(postId) {
  const result = await db.query(
    `--sql
      SELECT COUNT(*)
      FROM likes
      WHERE "postId" = $1
    `,
    [postId]
  );

  return result.rows[0].count;
}

async function GetUserNameAsLikedThisPost(postId) {
  const result = await db.query(
    `--sql
      SELECT "userId", "username"
      FROM users
      INNER JOIN likes
      ON users.id = likes."userId"
      WHERE "postId" = $1
    `,
    [postId]
  );

  return result.rows;
}

const LikesRepository = {
  LikeThisPost,
  UnlikeThisPost,
  GetLikes,
  GetUserNameAsLikedThisPost
};

export default LikesRepository;