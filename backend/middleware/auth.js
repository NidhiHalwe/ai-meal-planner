import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../utils/errorHandler.js';

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return sendErrorResponse(res, 401, 'AUTH_REQUIRED', 'Missing token');
  }

  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    return sendErrorResponse(res, 401, 'AUTH_REQUIRED', 'Missing token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id || decoded._id;
    return next();
  } catch (error) {
    return sendErrorResponse(res, 401, 'INVALID_TOKEN', 'Invalid token');
  }
}










