import hashtagsRepository from '../repositories/Hashtags.js';
import PostsRepository from '../repositories/PostsRepository.js';

export async function getTrendingHashtags(req, res) {
  try {
    const ranking = await hashtagsRepository.getTrendingHashtags();
    return res.status(200).send(ranking);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

export async function getHashtagPosts(req, res) {
  const { hashtag } = req.params;
  const { page } = req.query;
  try {
    const result = await hashtagsRepository.getHashtagPosts(hashtag, page);
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
    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  }
}

export async function checkMorePosts(req, res) {
  const { page } = req.query;
  const { hashtag } = req.params;
  let posts = [];

  try {
    const result = await hashtagsRepository.getHashtagPosts(hashtag, page);
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

export async function createHashtag(req, res) {
  const { name } = req.body;

  try {
    const result = await hashtagsRepository.getHashtag(name);

    if (!result.rows.length) {
      res.status(409).send('Hashtag already exists');
      return;
    }
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while checking hashtags table',
      error: err,
    });
  }

  try {
    await hashtagsRepository.addHashtag(name);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while creating a new hashtag',
      error: err,
    });
  }
}
