import hashtagsRepository from '../repositories/Hashtags.js';

export async function getTrendingHashtags(req, res) {
  const ranking = await hashtagsRepository.getTrendingHashtags();
  return res.status(200).send(ranking);
}
