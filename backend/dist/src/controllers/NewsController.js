"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsPosts_1 = require("../models/newsPosts");
class NewsController {
    constructor() {
        this.getAllPosts = async (_req, res) => {
            try {
                const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
                const posts = await newsPostsTable.getAll();
                res.json(posts);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching posts.' });
            }
        };
        this.getPostById = async (req, res) => {
            try {
                const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
                const post = await newsPostsTable.getById(req.params.id);
                if (!post) {
                    return res.status(404).json({ error: 'Post not found.' });
                }
                res.json(post);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.createPost = async (req, res) => {
            try {
                const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
                const newPost = await newsPostsTable.create(req.body);
                console.log(newPost);
                res.json(newPost);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while creating the post.' });
            }
        };
        this.updatePost = async (req, res) => {
            try {
                const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
                const updatedPost = await newsPostsTable.update(req.params.id, req.body);
                if (!updatedPost) {
                    return res.status(404).json({ error: 'Post not found.' });
                }
                res.json(updatedPost);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while updating the post.' });
            }
        };
        this.deletePost = async (req, res) => {
            try {
                const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
                const deletedPost = await newsPostsTable.delete(req.params.id);
                if (!deletedPost) {
                    return res.status(404).json({ error: 'Post not found.' });
                }
                res.json(deletedPost);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while deleting the post.' });
            }
        };
    }
}
exports.default = NewsController;
