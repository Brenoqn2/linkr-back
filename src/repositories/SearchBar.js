import db from '../config/database.js';

function searchUsers(search) {
  return db.query(
    `--sql
    SELECT username
    FROM users
    WHERE LOWER (users.username) LIKE $1
        `,
    [`%${search}%`]
  );
}

const searchRepository = { searchUsers };
export default searchRepository;
