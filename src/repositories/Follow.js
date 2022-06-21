import db from '../config/database.js';

function FollowUser(userId, followingId) {

    // followerId = quem está seguindo
    // followingId = quem está sendo seguido

    return db.query(
        `--sql
      INSERT INTO "followers" ("followerId", "followingId")
      VALUES ($1, $2)
    `,
        [userId, followingId]
    );
}

function UnFollowUser(userId, followingId) {

    // followerId = quem está seguindo
    // followingId = quem está sendo seguido

    return db.query(
        `--sql
      DELETE FROM "followers"
      WHERE "followerId" = $1 AND "followingId" = $2
    `,
        [userId, followingId]
    );
}

function GetAllFollowers(userId) {

    return db.query(
        `--sql
      SELECT "followerId"
      FROM "followers"
      WHERE "followingId" = $1
    `,
        [userId]
    );
}

const FollowRepository = {
    FollowUser,
    UnFollowUser,
    GetAllFollowers,
}

export default FollowRepository;