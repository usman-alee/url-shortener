const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { shortenURL, getOriginalURL, redirectWithRetry } = require('./urlShortener');

app.use(express.json());

app.post('/url', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const shortenedURL = shortenURL(url);
        res.status(200).json({ shortenedURL });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/:code', (req, res) => {
  const { code } = req.params;
  const originalURL = getOriginalURL(code);
  if (!originalURL) {
    return res.status(404).json({ error: 'Shortened URL not found' });
  }

  redirectWithRetry(originalURL, res);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
