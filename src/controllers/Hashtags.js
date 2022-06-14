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
    const posts = await hashtagsRepository.getHashtagPosts(hashtag);
    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  }
}
