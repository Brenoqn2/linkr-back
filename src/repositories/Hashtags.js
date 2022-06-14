import db from '../config/database.js';

async function getTrendingHashtags() {
  const ranking = db.query(`
    SELECT name
    FROM hashtags
    JOIN "hashtagPosts" ON "hashtagPosts"."hashtagId" = hashtags.id
    GROUP BY name
    ORDER BY COUNT("hashtagPosts") DESC
    LIMIT 10
  `);
  return ranking.rows;
}

async function getHashtagPosts(hashtag) {
  const posts = db.query(
    `
    SELECT *
    FROM posts
    JOIN "hashtagPosts" ON "hashtagPosts"."postId" = posts.id
    WHERE "hashtagPosts"."hashtagId" = (
        SELECT id
        FROM hashtags
        WHERE name = $1
    )
    ORDER BY posts."createdAt" DESC
    `,
    [hashtag]
  );
  return posts.rows;
}

const hashtagsRepository = { getTrendingHashtags, getHashtagPosts };
export default hashtagsRepository;
