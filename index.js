const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

let urls = [];

// Read the file and store the URLs in memory
fs.readFile('path/h.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  urls = data.split('\n').filter(url => url.trim() !== '');
});

// API endpoint to get a random image URL
app.get('/get-random-videos', (req, res) => {
  const randomUrl = getRandomItem(urls);
  res.json({ url: randomUrl });
});

// Helper function to get a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start the server on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
