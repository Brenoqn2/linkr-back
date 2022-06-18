import LikesRepository from '../repositories/LikesRepository.js';

export async function LikePostController(req, res) {

    const { postId } = req.params;
    const { userId } = req.body;

    try {

        const result = await LikesRepository.LikeThisPost(userId, postId);
        if (result.rowCount === 0) return res.status(404).send('Error');
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err)
    }
}

export async function UnlikePostController(req, res) {

    const { postId } = req.params;
    const { userId } = req.body;

    try {

        const result = await LikesRepository.UnlikeThisPost(userId, postId);
        if (result.rowCount === 0) return res.status(404).send('Error');
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err)
    }
}

export async function GetLikesController(req, res) {

    const { postId } = req.params;

    try {

        const likesCount = await LikesRepository.GetLikes(postId);
        if (likesCount.rowCount === 0) return res.status(500).send(`Error during getting likes count from postId: ${postId}`);

        const UsersAsLikedThisPost = await LikesRepository.GetUserNameAsLikedThisPost(postId);
        if (UsersAsLikedThisPost.rowCount === 0) return res.status(500).send(`Error during getting users as liked this post from postId: ${postId}`);

        res.send({

            postId,
            likes: likesCount,
            users: UsersAsLikedThisPost

        }).status(200);

    } catch (err) {
        res.status(500).send(`Error during getting likes: ${err}`)
    }
}