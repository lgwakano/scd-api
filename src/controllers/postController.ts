import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma/prisma';

//get all posts
const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    next('Error fetching posts');
  }
};

// create post
const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await prisma.post.create({
      // TODO: validation data with package JOI or similar
      data: {
        authorId: 1, // TODO: grab the authenticated user
        ...req.body,
      },
    });

    res.json({ post });
  } catch (error) {
    console.error('Error in createPost:', error);
    next('Error creating post');
  }
};

// get a post by id
const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json({ post });
  } catch (error) {
    console.error(`Error in getPostById for id ${req.params.id}:`, error);
    next(`Error fetching post with id ${req.params.id}`);
  }
};

// update a post
const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json({ post });
  } catch (error) {
    console.error(`Error in updatePost for id ${req.params.id}:`, error);
    next(`Error updating post with id ${req.params.id}`);
  }
};

// delete a post
const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.post.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error in deletePost for id ${req.params.id}:`, error);
    next(`Error deleting post with id ${req.params.id}`);
  }
};

// get a user's post
const getUsersPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const usersWithPosts = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        posts: {
          where: {
            published: true,
          },
        },
      },
    });

    const posts = usersWithPosts?.posts;
    res.json(posts);
  } catch (error) {
    console.error(`Error in getUsersPosts for user id ${req.params.id}:`, error);
    next(`Error fetching posts for user with id ${req.params.id}`);
  }
};

export {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getUsersPosts,
};
