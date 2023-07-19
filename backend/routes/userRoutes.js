import express from "express";
import { login, register, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authmiddleware.js"

const router = express.Router();
router.post('/signup', register);
router.post('/login', login);
router.post('/profile', protect, updateUserProfile)

export default router;