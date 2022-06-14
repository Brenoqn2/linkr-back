import PostsRepository from '../repositories/PostsRepository.js';

export async function getPosts(req, res) {
  const { page } = req.query;

  try {
    const result = await PostsRepository.getAllPosts(page);
    const posts = result.rows;

    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting posts',
      error: err,
    });
  }
}

export async function createPost(req, res) {
  const { authorization } = req.headers;

  try {
    const { rows: results } = await PostsRepository.getUserIdByToken(
      authorization
    );
    const [result] = results;
    const id = result.userId;

    await PostsRepository.createPost(req.body, id);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting posts',
      error: err,
    });
  }
}
