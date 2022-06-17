import urlMetadata from 'url-metadata';
import PostsRepository from '../repositories/PostsRepository.js';
import UserRepository from '../repositories/UserRepository.js';
import hashtagsRepository from '../repositories/Hashtags.js';

export async function getPosts(req, res) {
  const { page } = req.query;
  let posts = [];

  try {
    const result = await PostsRepository.getAllPosts(page);
    posts = result.rows;

    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting posts',
      error: err,
    });
  }
}

export async function getMetadata(req, res) {
  const { id } = req.params;

  try {
    const result = await PostsRepository.getPostById(id);
    console.log(result.rows);

    if (!result.rows.length) {
      res.status(404).send('Post not found');
      return;
    }

    const { link } = result.rows[0];

    const metadata = await urlMetadata(link);

    res.send(metadata);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting link metadata',
      error: err,
    });
  }
}

export async function createPost(req, res) {
  const { body } = req;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  const hashtags = body.content.match(/\B#\w\w+\b/g);

  try {
    const resultUser = await UserRepository.getUserByToken(token);
    const { id: userId } = resultUser.rows[0];

    const resultPost = await PostsRepository.createPost(body, userId);
    const { id: postId } = resultPost.rows[0];

    // eslint-disable-next-line no-restricted-syntax
    for (let tag of hashtags) {
      tag = tag.replace('#', '').toLowerCase();

      hashtagsRepository.addHashtag(tag, postId);
    }

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while creating post',
      error: err,
    });
  }
}
