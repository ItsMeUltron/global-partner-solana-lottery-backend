const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/entry', require('./route/entry'));

// Load pots from JSON
const potsFile = './pots.json';

// GET /pots → return all pots data
app.get('/pots', (req, res) => {
  try {
    const potsData = JSON.parse(fs.readFileSync(potsFile));
    res.json(potsData);
  } catch (err) {
    console.error('Error reading pots.json:', err);
    res.status(500).json({ error: 'Failed to load pots' });
  }
});

app.get('/', (req, res) => {
  res.send('Lottery backend running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
