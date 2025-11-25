import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

router.post('/register', async (request, response) => {
  try {
    const { username, email, password } = request.body;

    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      return response.status(400).json({
        message: 'User already exists with this email or username',
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      response.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      response.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      response.status(401).json({
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.get('/profile', async (request, response) => {
  try {
    response.json({ message: 'User profile route' });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

export default router;