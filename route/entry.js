const express = require('express');
const fs = require('fs');
const router = express.Router();

// Load pots data
const potsFile = './pots.json';

// POST /entry
// Body: { "user": "wallet_address", "amount": 10, "pot": "global" or "partner1" }
router.post('/', (req, res) => {
  const { user, amount, pot } = req.body;

  if (!user || !amount || !pot) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // Read current pots
  const potsData = JSON.parse(fs.readFileSync(potsFile));

  // Check if pot exists
  if (!potsData[pot]) {
    return res.status(400).json({ error: 'Invalid pot' });
  }

  // Add entry
  potsData[pot].entries.push({ user, amount, timestamp: Date.now() });
  potsData[pot].totalAmount += amount;

  // Save pots
  fs.writeFileSync(potsFile, JSON.stringify(potsData, null, 2));

  res.json({ message: `Entry added to ${pot}`, totalAmount: potsData[pot].totalAmount });
});

module.exports = router;
