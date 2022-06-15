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

const PostsRepository = {
  getAllPosts,
  getPostById,
};

export default PostsRepository;
