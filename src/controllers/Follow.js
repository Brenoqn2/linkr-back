import FollowRepository from "../repositories/Follow.js";

export async function FollowUserController(req, res) {

    // followerId = quem está seguindo
    // followingId = quem está sendo seguido

    const { followingId } = req.params;
    const { userId } = req.body;

    try {

        const result = await FollowRepository.FollowUser(userId, followingId);
        if (result.rowCount > 0) return res.sendStatus(200);
        else return res.status(404).send('Error while following user');

    } catch (err) {
        res.status(500).send(`Error during follow the user: ${err}`)
    }
}

export async function UnFollowUserController(req, res) {

    // followerId = quem está seguindo
    // followingId = quem está sendo seguido

    const { followingId } = req.params;
    const { userId } = req.body;

    try {

        const result = await FollowRepository.UnFollowUser(userId, followingId);
        if (result.rowCount > 0) return res.sendStatus(200);
        else return res.status(404).send('Error while unfollowing user');

    } catch (err) {
        res.status(500).send(`Error during unfollow the user: ${err}`)
    }
}

export async function GetUserFollowersController(req, res) {

    const { userId } = req.params;

    try {

        const followers = await FollowRepository.GetAllFollowers(userId);
        res.send(followers.rows);

    } catch (err) {
        res.status(500).send(`Error during getting followers count: ${err}`)
    }
}