import db from '../config/database.js';

function getAllPosts(userId, page) {
  const offset = page ? (page - 1) * 10 : 0;

  return db.query(
    `--sql
      SELECT POSTS.*,
      USERS.USERNAME,
      USERS.PICTURE
      FROM POSTS
      LEFT JOIN FOLLOWERS F ON F."followingId" = POSTS."userId"
      JOIN USERS ON POSTS."userId" = USERS.ID
      WHERE F."followerId" = $1
      ORDER BY "createdAt" DESC
      OFFSET $2
      LIMIT 10
    `,
    [userId, offset]
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

function postRepost(postId, userRepostId) {
  // console.log(postId, userRepostId);

  return db.query(
    `--sql
      INSERT INTO POSTS ("postId", "userId", link, content)
      VALUES ($1, $2, '', '')
    `,
    [postId, userRepostId]
  );
}

async function getReposts(postId) {
  return db.query(
    `--sql
    SELECT UR."username" as repostUser, UP."username" as postUser, P."link", P."content", UP.id as "userId", UP."picture", R."id", P."id" as postId
    FROM posts R
    JOIN posts P ON R."postId" = P."id"
    JOIN users UR ON R."userId" = UR."id"
    JOIN users UP ON P."userId" = UP."id"
    WHERE R.id = $1
    `,
    [postId]
  );
}

function checkNewPosts(postId) {
  return db.query(
    `--sql
    SELECT "userId"
    FROM posts
    WHERE id > $1
    `,
    [postId]
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
  getReposts,
  checkNewPosts,
};

export default PostsRepository;
