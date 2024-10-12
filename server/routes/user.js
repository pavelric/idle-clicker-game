import express from 'express';
import pool from '../db/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await pool.query('SELECT id, username FROM users WHERE id = $1', [req.user.id]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/save-progress', authenticateToken, async (req, res) => {
  try {
    const { stats } = req.body;
    await pool.query(
      'UPDATE users SET stats = $1 WHERE id = $2',
      [JSON.stringify(stats), req.user.id]
    );
    res.json({ message: 'Progress saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;