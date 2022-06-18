import searchRepository from '../repositories/SearchBar.js';

export async function searchUsers(req, res) {
  try {
    const { search } = req.body;
    const result = await searchRepository.searchUsers(search);
    return res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
