import urlMetadata from 'url-metadata';
import PostsRepository from '../repositories/PostsRepository.js';
import UserRepository from '../repositories/UserRepository.js';

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
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  try {
    const { rows: results } = await UserRepository.getUserByToken(token);
    console.log(results);
    const [result] = results;
    const { id } = result;

    await PostsRepository.createPost(req.body, id);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while creating post',
      error: err,
    });
  }
}
