/* eslint-disable no-plusplus */
import urlMetadata from 'url-metadata';
import { response } from 'express';
import PostsRepository from '../repositories/PostsRepository.js';
import UserRepository from '../repositories/UserRepository.js';
import hashtagsRepository from '../repositories/Hashtags.js';
import LikesRepository from '../repositories/LikesRepository.js';

export async function getPosts(req, res) {
  const { page } = req.query;
  let posts = [];

  try {
    const result = await PostsRepository.getAllPosts(page);
    posts = result.rows;
    const reposts = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].postId != 0) {
        reposts.push({ repost: posts[i], indice: i });
      }
    }

    for (let i = 0; i < reposts.length; i++) {
      const resultReposts = await PostsRepository.getReposts(
        reposts[i].repost.id
      );
      posts.splice(reposts[i].indice, 1, resultReposts.rows[0]);
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting posts',
      error: err,
    });
  }
}

export async function checkMorePosts(req, res) {
  const { page } = req.query;
  let posts = [];

  try {
    const result = await PostsRepository.getAllPosts(page);
    posts = result.rows;

    if (posts.length > 0) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting posts',
      error: err,
    });
  }
}

export async function checkNewPosts(req, res) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();
  try {
    const postsResult = await PostsRepository.checkNewPosts(id);
    const postsUsersIds = postsResult.rows;
    const userIdResult = await UserRepository.getUserByToken(token);
    const userId = userIdResult.rows[0].id;
    const followingResult = await UserRepository.getFollowingIds(userId);
    let followingIds = followingResult.rows;
    followingIds = followingIds.map((object) => object.id);
    let cont = 0;
    for (let i = 0; i < postsUsersIds.length; i++) {
      if (!followingIds.includes(postsUsersIds[i].userId)) {
        cont++;
      }
    }
    const newPosts = postsUsersIds.length - cont;
    res.send({ newPosts });
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting new posts',
      error: err,
    });
  }
}

export async function getMetadata(req, res) {
  const { id } = req.params;

  try {
    const result = await PostsRepository.getPostById(id);

    if (!result.rows.length) {
      res.status(404).send('Post not found');
      return;
    }

    const { link } = result.rows[0];

    const metadata = await urlMetadata(link);

    res.send(metadata);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting link metadata',
      error: err,
    });
  }
}

export async function createPost(req, res) {
  const { body } = req;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  const hashtags = body.content.match(/\B#\w\w+\b/g);

  try {
    const resultUser = await UserRepository.getUserByToken(token);
    const { id: userId } = resultUser.rows[0];

    const resultPost = await PostsRepository.createPost(body, userId);
    const { id: postId } = resultPost.rows[0];

    if (hashtags) {
      // eslint-disable-next-line no-restricted-syntax
      for (let tag of hashtags) {
        tag = tag.replace('#', '').toLowerCase();

        await hashtagsRepository.addHashtag(tag, postId);
      }
    }

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while creating post',
      error: err,
    });
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    await hashtagsRepository.deleteHashtagByPostId(id);
    await LikesRepository.deleteLikesFromPost(id);
    await PostsRepository.deletePost(id);

    res.sendStatus(202);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while deleting post',
      error: err,
    });
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const { body } = req;
  const hashtags = body.content.match(/\B#\w\w+\b/g);

  try {
    await hashtagsRepository.deleteHashtagByPostId(id);
    await PostsRepository.editPost(body, id);

    if (hashtags) {
      // eslint-disable-next-line no-restricted-syntax
      for (let tag of hashtags) {
        tag = tag.replace('#', '').toLowerCase();

        await hashtagsRepository.addHashtag(tag, id);
      }
    }
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while editing post',
      error: err,
    });
  }
}

export async function getComments(req, res) {
  const { id: postId } = req.params;

  const result = await PostsRepository.getComments(postId);
  const { rows: comments } = result;

  res.status(200).send(comments);
}

export async function createComment(req, res) {
  const { userId, postId, content } = req.body;
  const { userId: userIdFromToken } = res.locals;

  if (userId !== userIdFromToken) {
    res.status(409).send('Forbbiden');
    return;
  }

  try {
    const result = await PostsRepository.postComment(postId, userId, content);
    const { id: commentId } = result.rows[0];

    const commentResult = await PostsRepository.getCommentById(commentId);
    const [comment] = commentResult.rows;

    res.status(201).send(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Internal error while creating comment',
      error: err,
    });
  }
}

export async function createRepost(req, res) {
  const { postId } = req.params;
  const { userRepostId } = req.body;
  try {
    await PostsRepository.postRepost(postId, userRepostId);

    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
}

export async function countReposts(req, res) {
  const { postId } = req.params;

  try {
    const result = await PostsRepository.getReposts(postId);
    const { rowCount: reposts } = result;
    res
      .send({
        postId,
        reposts,
      })
      .status(200);
  } catch (err) {
    res.status(500).send(`Error during getting reposts: ${err}`);
  }
}
