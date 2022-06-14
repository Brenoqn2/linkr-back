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

const PostsRepository = {
  getAllPosts,
};

export default PostsRepository;
