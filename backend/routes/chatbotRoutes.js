import express from 'express';

const router = express.Router();

// Placeholder for chatbot routes
router.post('/chat', async (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Chatbot feature not implemented yet'
  });
});

export default router;