import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
  // Log the JWT secret key to verify it's being read correctly
  console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);

  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If there is no token, send an error
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // Verify the token using the JWT secret synchronously
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    // Assert that the decoded token is of type JwtPayload
    req.user = decoded as JwtPayload;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If there is an error (invalid token), send a 403 response
    return res.status(403).json({ message: 'Access Denied: Invalid Token' });
  }
};
