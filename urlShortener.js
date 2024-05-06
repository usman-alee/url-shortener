const urlMap = new Map();
let attempts = 0;
const maxAttempts = 3;

function generateCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    try {
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
    } catch (error) {
        console.error('Error generating code:', error.message);
        throw new Error('Code generation failed');
    }
    return code;
}

function shortenURL(originalURL) {
    try {
        const code = generateCode();
        const shortenedURL = `http://localhost:3000/${code}`;
        urlMap.set(code, originalURL);
        return shortenedURL;
    } catch (error) {
        console.error('Error shortening URL:', error.message);
        throw new Error('URL shortening failed');
    }
}

function getOriginalURL(code) {
    return urlMap.get(code);
}

function redirectWithRetry(originalURL, res) {
    fetch(originalURL, {
      method: 'HEAD'
    })
      .then((response) => {
        if (response.ok) {
          res.redirect(originalURL);
        } else {
          attempts++;
          if (attempts <= maxAttempts) {
            redirectWithRetry(originalURL, res);
          } else {
            res.status(500).json({ error: 'Original URL is not working' });
          }
        }
      })
      .catch((error) => {
        attempts++;
        if (attempts <= maxAttempts) {
          redirectWithRetry(originalURL, res);
        } else {
          res.status(500).json({ error: 'Error checking original URL' });
        }
      });
  }

module.exports = { shortenURL, getOriginalURL, redirectWithRetry };