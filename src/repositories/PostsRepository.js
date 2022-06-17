import db from '../config/database.js';

function getAllPosts(page) {
  const offset = page ? (page - 1) * 20 : 0;

  return db.query(
    `--sql
        SELECT 
          POSTS.*,
          USERS.username,
          USERS.picture
        FROM POSTS
        JOIN USERS ON POSTS."userId" = USERS.id
        ORDER BY "createdAt" DESC
        OFFSET $1
        LIMIT 20
    `,
    [offset]
  );
}

function getPostById(id) {
  return db.query(
    `--sql
      SELECT * FROM POSTS
      WHERE id = $1
    `,
    [id]
  );
}

function createPost(body, userId) {
  const { link, content } = body;
  return db.query(
    `INSERT INTO posts ("userId", link, content) 
    VALUES ($1, $2, $3)
    RETURNING id
    `,
    [userId, link, content]
  );
}

function deletePost(postId) {
  return db.query(
    `DELETE FROM posts
    WHERE id = $1
    `,
    [postId]
  );
}

function editPost(body, postId) {
  const { link, content } = body;
  return db.query(
    `UPDATE posts
    SET link = $1, content = $2
    WHERE id = $3
    `,
    [link, content, postId]
  );
}

const PostsRepository = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  editPost,
};

export default PostsRepository;
