import express from 'express';
import {
  getUsers,
  claimPoints,
  getSingleUser,
} from '../controllers/userController.js';
import {isAuth} from '../middlewares/isAuth.js'

const router = express.Router();

router.get('/single', isAuth, getSingleUser); //get single user
router.get('/all', isAuth, getUsers); // Get all users
router.post('/claim', claimPoints); // Claim points for a user

export default router;
