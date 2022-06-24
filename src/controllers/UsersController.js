import FollowRepository from '../repositories/Follow.js';
import UserRepository from '../repositories/UserRepository.js';
import PostsRepository from '../repositories/PostsRepository.js';

export async function getUserData(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  try {
    const { rows: result } = await UserRepository.getUserByToken(token);
    const [user] = result;
    delete user.password;

    const { rows: following } = await FollowRepository.getFollowing(user.id);
    user.followingIds = following.map((follow) => follow.followingId);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting user data',
      error: err,
    });
  }
}

export async function ChangeUserAvatarController(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  const GetUserByToken = await UserRepository.getUserByToken(token);
  if (GetUserByToken.rowCount === 0) return console.log('User not found');

  const userId = GetUserByToken.rows[0].id;
  const { avatar } = req.body;

  if (!avatar) return res.status(400).send('avatar not provided');

  try {
    await UserRepository.UpdateUserAvatar(userId, avatar);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while changing user avatar',
      error: err,
    });
  }
}

export async function getUserPosts(req, res) {
  const { id } = req.params;
  const { page } = req.query;

  try {
    const result = await UserRepository.getUserPosts(id, page);
    const { rows: posts } = result;

    const reposts = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].postId != 0) {
        reposts.push({ repost: posts[i], indice: i });
      }
    }

    for (let i = 0; i < reposts.length; i++) {
      const resultReposts = await PostsRepository.getReposts(
        reposts[i].repost.id
      );
      posts.splice(reposts[i].indice, 1, resultReposts.rows[0]);
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting user posts',
      error: err,
    });
  }
}

export async function checkMorePosts(req, res) {
  const { id } = req.params;
  const { page } = req.query;
  let posts = [];

  try {
    const result = await UserRepository.getUserPosts(id, page);
    posts = result.rows;

    if (posts.length > 0) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting posts',
      error: err,
    });
  }
}

export async function getUsers(req, res) {
  const { name } = req.query;
  const { userId } = res.locals;
  try {
    const result = await UserRepository.getUsersByName(name, userId);
    const { rows: users } = result;

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting users',
      error: err,
    });
  }
}
