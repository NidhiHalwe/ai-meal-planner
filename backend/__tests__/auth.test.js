import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import { jest } from '@jest/globals';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';
import { signup, login } from '../controllers/authController.js';

describe('Auth API and middleware', () => {
  const app = express();
  app.use(express.json());

  app.post('/signup', async (req, res) => {
    await signup(req, res);
  });

  app.post('/login', async (req, res) => {
    await login(req, res);
  });

  app.get('/private', authMiddleware, (req, res) => {
    res.json({ ok: true, userId: req.userId });
  });

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    User.findOne = jest.fn();
    User.prototype.save = jest.fn(async function save() {
      this._id = this._id || 'user-123';
      return this;
    });
    jest.restoreAllMocks();
  });

  it('signup creates user and returns a JWT', async () => {
    User.findOne.mockResolvedValue(null);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');

    const response = await request(app)
      .post('/signup')
      .send({ email: 'new@example.com', password: 'secret123' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeTruthy();
    expect(response.body.email).toBe('new@example.com');
  });

  it('login rejects invalid credentials', async () => {
    User.findOne.mockResolvedValue({
      email: 'abc@example.com',
      password: await bcrypt.hash('secret123', 10),
    });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send({ email: 'abc@example.com', password: 'wrongpass' });

    expect(response.status).toBe(400);
    expect(response.body.error.message).toContain('Invalid');
  });

  it('auth middleware rejects missing token', async () => {
    const response = await request(app).get('/private');
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe('Missing token');
  });

  it('auth middleware accepts valid JWT', async () => {
    const token = jwt.sign({ id: 'user-42' }, 'test-secret', { expiresIn: '1h' });
    const response = await request(app)
      .get('/private')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe('user-42');
  });
});
