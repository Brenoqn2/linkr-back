import UserRepository from '../repositories/UserRepository.js';

export async function getUserData(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  try {
    const { rows: results } = await UserRepository.getUserByToken(token);
    const [result] = results;
    delete result.password;

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting user data',
      error: err,
    });
  }
}
