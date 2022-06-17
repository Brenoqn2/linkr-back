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

export async function ChangeUserAvatarController(req, res) {

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  const GetUserByToken = await UserRepository.getUserByToken(token);
  if(GetUserByToken.rowCount === 0) return console.log('User not found');

  const userId = GetUserByToken.rows[0].id;
  const avatar = req.body.avatar;

  if(!avatar) return res.status(400).send('avatar not provided');

  try {
    
    await UserRepository.UpdateUserAvatar(userId, avatar);
    res.sendStatus(200);

  } catch (err) {
    res.status(500).send({
      message: 'Internal error while changing user avatar',
      error: err,
    });
  }

}
