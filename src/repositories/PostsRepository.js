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
      SELECT C.*,
        U.USERNAME,
        U.PICTURE,
        (CASE WHEN C."userId" = P."userId" THEN true ELSE false END) AS "isAuthor"
      FROM COMMENTS C
      JOIN USERS U ON C."userId" = U.ID
      JOIN POSTS P ON C."postId" = P.ID
      WHERE C."postId" = $1
    `,
    [postId]
  );
}

function getCommentById(commentId) {
  return db.query(
    `--sql
      SELECT C.*,
        U.USERNAME,
        U.PICTURE,
        (CASE WHEN C."userId" = P."userId" THEN true ELSE false END) AS "isAuthor"
      FROM COMMENTS C
      JOIN USERS U ON C."userId" = U.ID
      JOIN POSTS P ON C."postId" = P.ID
      WHERE C.ID = $1
    `,
    [commentId]
  );
}

function postComment(postId, userId, content) {
  return db.query(
    `--sql
      INSERT INTO COMMENTS ("postId", "userId", content)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
    [postId, userId, content]
  );
}

function postRepost(postId, userId) {
  return db.query(
    `--sql
      INSERT INTO reposts ("postId", "userId")
      VALUES ($1, $2)
      RETURNING id
    `,
    [postId, userId]
  );
}

const PostsRepository = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  editPost,
  getComments,
  getCommentById,
  postComment,
  postRepost,
};

export default PostsRepository;
