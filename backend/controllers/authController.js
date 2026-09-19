import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../utils/errorHandler.js';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

export const signup = async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '').trim();

    if (!isValidEmail(email) || password.length < 6) {
      return sendErrorResponse(res, 400, 'VALIDATION_ERROR', 'Please provide a valid email and a password with at least 6 characters.');
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return sendErrorResponse(res, 409, 'USER_EXISTS', 'Email already exists.');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, email: user.email });
  } catch (error) {
    return sendErrorResponse(res, 500, 'SIGNUP_ERROR', 'Signup failed. Please try again.');
  }
};

export const login = async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '').trim();

    if (!isValidEmail(email) || password.length < 6) {
      return sendErrorResponse(res, 400, 'VALIDATION_ERROR', 'Invalid email or password.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 400, 'AUTH_FAILED', 'Invalid email or password.');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return sendErrorResponse(res, 400, 'AUTH_FAILED', 'Invalid email or password.');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, email: user.email });
  } catch (error) {
    return sendErrorResponse(res, 500, 'LOGIN_ERROR', 'Login failed. Please try again.');
  }
};








