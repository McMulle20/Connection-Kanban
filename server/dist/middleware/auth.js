import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
export const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // If there is no token, send an error
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
    try {
        // Ensure JWT secret key is available
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        // Attach the decoded user data to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        return next();
    }
    catch (error) {
        // Handle specific JWT errors
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // General error handler for unexpected errors
        return res.status(500).json({ message: 'Failed to authenticate token' });
    }
};
