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
    [id])
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

function getUserIdByToken(token) { //! CRIAR UM REPOSITORIO PRA USERS E REALOCAR ESTA FUNCAO PARA LA !
  return db.query(
    `SELECT s."userId" FROM sessions s 
    WHERE token = $1`,
    [token]
  );
}

const PostsRepository = {
  getAllPosts,
  getPostById,
  createPost,
  getUserIdByToken,

};

export default PostsRepository;
