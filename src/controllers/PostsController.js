import PostsRepository from '../repositories/PostsRepository';

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
