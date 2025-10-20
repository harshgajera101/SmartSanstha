import express from 'express';

const router = express.Router();

// Placeholder for quiz generation from part
router.post('/from-part', async (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Quiz generation feature not implemented yet'
  });
});

// Placeholder for quiz generation from article
router.post('/from-article', async (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Quiz generation feature not implemented yet'
  });
});

export default router;