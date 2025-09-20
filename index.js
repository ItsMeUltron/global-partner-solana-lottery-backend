const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/entry', require('./routes/entry'));

// Load pots
let pots = require('./pots.json');

app.get('/', (req, res) => {
  res.send('Lottery backend running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
