import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
router.use('/auth', authRoutes);
// Log to confirm the routes are being set up
console.log('Setting up routes');
// TODO: Add authentication to the API routes
router.use('/api', authenticateToken, apiRoutes);
export default router;
