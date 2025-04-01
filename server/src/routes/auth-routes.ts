import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // Log the incoming request body for debugging
  console.log('Login Request Body:', req.body);

  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    console.error('Error: Username or password missing.');
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });

    // If the user doesn't exist, return error
    if (!user) {
      console.error('Error: User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return error
    if (!isMatch) {
      console.error('Error: Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If user exists and password matches, generate JWT token
    const token = jwt.sign(
      { username: user.username }, // Payload
      process.env.JWT_SECRET_KEY as string, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    // Log the generated token (ensure not to log in production for security reasons)
    console.log('Generated JWT Token:', token);

    // Return the token in the response
    return res.json({ token });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
