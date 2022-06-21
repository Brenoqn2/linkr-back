import UserRepository from '../repositories/UserRepository.js';

export async function checkUserExists(req, res, next) {
  const { userId } = req.body;
  console.log(
    '🚀 ~ file: UserValidator.js ~ line 5 ~ checkUserExists ~ userId',
    userId
  );

  try {
    const result = await UserRepository.getUserById(userId);
    const { rows } = result;
    const [user] = rows;

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while validating user',
      error: err,
    });
  }
}
