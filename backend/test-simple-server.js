import express from 'express';

const app = express();
const PORT = 5001;

app.get('/test', (req, res) => {
  console.log('✅ Test endpoint was hit!');
  res.send('Hello! Server is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try opening: http://localhost:${PORT}/test`);
});
