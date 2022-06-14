import db from '../database/database.js';

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

const hashtagsRepository = { getTrendingHashtags };
export default hashtagsRepository;
