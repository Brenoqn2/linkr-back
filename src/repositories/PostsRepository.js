import db from '../config/database.js';

function getAllPosts(page) {
  const offset = (page - 1) * 20;

  return db.query(
    `--sql
        SELECT * FROM POSTS
        ORDER BY "createdAt" DESC
        OFFSET $1
        LIMIT 20
    `,
    [offset]
  );
}

function createPost(body, userId) {
  const { link, content } = body;
  return db.query(
    `INSERT INTO posts ("userId", link, content) 
    VALUES ($1, $2, $3)
    `,
    [userId, link, content]
  );
}

function getUserIdByToken(token) {
  return db.query(
    `SELECT s."userId" FROM sessions s 
    WHERE token = $1`,
    [token]
  );
}

const PostsRepository = {
  getAllPosts,
  createPost,
  getUserIdByToken,
};

export default PostsRepository;
