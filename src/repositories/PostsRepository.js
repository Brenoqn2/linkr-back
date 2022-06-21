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

function getComments(postId) {
  return db.query(
    `--sql
      SELECT 
        c.*, 
        u.username, 
        u.picture 
      FROM 
        comments c
      JOIN 
        users u ON c."userId" = u.id
      WHERE c."postId" = $1
    `,
    [postId]
  );
}

function postComment(postId, userId, content) {
  return db.query(
    `--sql
      INSERT INTO COMMENTS ("postId", "userId", content)
      VALUES ($1, $2, $3)
    `,
    [postId, userId, content]
  );
}

const PostsRepository = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  editPost,
  getComments,
  postComment,
};

export default PostsRepository;
