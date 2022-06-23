import db from '../config/database.js';

async function getTrendingHashtags() {
  const ranking = await db.query(`
    SELECT name
    FROM hashtags
    GROUP BY name
    ORDER BY COUNT(hashtags) DESC
    LIMIT 10
  `);
  return ranking.rows;
}

function getHashtagPosts(hashtag, page) {
  let offset = page ? (page - 1) * 10 : 0;
  if (offset < 0) offset = 0;
  return db.query(
    `--sql
      SELECT POSTS.*, USERS.username, USERS.picture FROM HASHTAGS
      JOIN POSTS ON POSTS.id = HASHTAGS."postId"
      JOIN USERS ON USERS.id = POSTS."userId"
      WHERE HASHTAGS.name = $1
      ORDER BY POSTS."createdAt" DESC
      OFFSET $2
      LIMIT 10
    `,
    [hashtag, offset]
  );
}

function getHashtag(hashtag) {
  return db.query(
    `--sql
      SELECT * FROM HASHTAGS
      WHERE name = $1
    `,
    [hashtag]
  );
}

function addHashtag(hashtag, postId) {
  return db.query(
    `--sql
      INSERT INTO HASHTAGS (name, "postId")
      VALUES ($1, $2)
      ON CONFLICT (name, "postId") DO NOTHING
    `,
    [hashtag, postId]
  );
}

function deleteHashtagByPostId(postId) {
  return db.query(
    `--sql
      DELETE FROM hashtags 
      WHERE "postId" = $1
    `,
    [postId]
  );
}

const hashtagsRepository = {
  getTrendingHashtags,
  getHashtagPosts,
  getHashtag,
  addHashtag,
  deleteHashtagByPostId,
};
export default hashtagsRepository;
