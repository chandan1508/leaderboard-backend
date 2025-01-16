import express from 'express';
import {
  login,
  register,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login); // Get all users
router.post('/register', register); // Claim points for a user

export default router;
