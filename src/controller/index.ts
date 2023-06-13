import express from "express";
import blogController from "./blog.controller";
import postController from './post.controller';
import blogTestController from './blog.controller.spec';
import UserController from "./user.controller";
import {AuthMiddleware} from "../middleware/auth.middleware";
import authController from "./auth.controller";

const router = express.Router();

router.use('/blogs', blogController);
router.use('/posts', postController);
router.use('/users', AuthMiddleware, UserController);
router.use('/auth', authController);
router.use('/testing', blogTestController);

export default router;