import hashtagsRepository from '../repositories/Hashtags.js';

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
  try {
    const result = await hashtagsRepository.getHashtagPosts(hashtag);
    const { rows: posts } = result;
    console.log(posts);
    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
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
