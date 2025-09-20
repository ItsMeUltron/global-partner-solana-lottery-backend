const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure the route folder exists
const entryRoutePath = path.join(__dirname, 'route', 'entry');
app.use('/entry', require(entryRoutePath));

// Load pots
const potsFile = path.join(__dirname, 'pots.json');

app.get('/', (req, res) => {
  res.send('Lottery backend running!');
});

// Optional: GET /pots endpoint to fetch current pots
app.get('/pots', (req, res) => {
  try {
    const potsData = JSON.parse(fs.readFileSync(potsFile));
    res.json(potsData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read pots data', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
