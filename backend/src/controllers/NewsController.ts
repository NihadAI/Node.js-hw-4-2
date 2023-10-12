import express from 'express'
import { FileDB } from "../models/newsPosts";

class NewsController {
  getAllPosts = async (_req: express.Request, res: express.Response) => {
      try {
        const newsPostsTable = await FileDB.getTable('newspost');
        const posts = await newsPostsTable.getAll();
        res.json(posts);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
      }
  };

  getPostById = async  (req: express.Request, res: express.Response) => {
      try {
        const newsPostsTable = await FileDB.getTable('newspost');
        const post = await newsPostsTable.getById(req.params.id);
        if (!post) {
          return res.status(404).json({ error: 'Post not found.' });
        }
        res.json(post);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  createPost = async  (req: express.Request, res: express.Response) => {
      try {
        const newsPostsTable = await FileDB.getTable('newspost');
        const newPost = await newsPostsTable.create(req.body);
        console.log(newPost);
        res.json(newPost);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the post.' });
      }
  };

  updatePost = async  (req: express.Request, res: express.Response) => {
      try {
        const newsPostsTable = await FileDB.getTable('newspost');
        const updatedPost = await newsPostsTable.update(req.params.id, req.body);
        if (!updatedPost) {
          return res.status(404).json({ error: 'Post not found.' });
        }
        res.json(updatedPost);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post.' });
      }
  };

  deletePost = async  (req: express.Request, res: express.Response) => {
      try {
        const newsPostsTable = await FileDB.getTable('newspost');
          const deletedPost = await newsPostsTable.delete(req.params.id);
          if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found.' });
          }
          res.json(deletedPost);
      } catch (error) {
          res.status(500).json({ error: 'An error occurred while deleting the post.' });
      }
  }
}

export default NewsController