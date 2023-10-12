"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NewsController_1 = __importDefault(require("../controllers/NewsController"));
const router = express_1.default.Router();
const news = new NewsController_1.default();
router.get('/newsposts', news.getAllPosts);
router.get('/newsposts/:id', news.getPostById);
router.post('/newsposts', news.createPost);
router.put('/newsposts/:id', news.updatePost);
router.delete('/newsposts/:id', news.deletePost);
exports.default = router;
