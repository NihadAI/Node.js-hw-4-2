import express from 'express';
import NewsController from '../controllers/NewsController';

const router = express.Router();
const news = new NewsController()

router.get('/newsposts', news.getAllPosts)
router.get('/newsposts/:id', news.getPostById)
router.post('/newsposts', news.createPost)
router.put('/newsposts/:id', news.updatePost)
router.delete('/newsposts/:id', news.deletePost)

export default router;