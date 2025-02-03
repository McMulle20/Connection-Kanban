import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// POST /login - Login a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed: User not found' });
  }

  // Validate password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
  }

  // Get secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ message: 'Server error: Missing JWT secret key' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

  return res.json({ token });
};

// Define login route
router.post('/login', login);

export default router;
