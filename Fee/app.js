const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

let fees = [];

// GET all fees
app.get('/api/fees', (req, res) => {
  res.json(fees);
});

// POST new fee calculation
app.post('/api/fees', (req, res) => {
  const { examName, amount } = req.body;
  const newFee = { id: fees.length + 1, examName, amount };
  fees.push(newFee);
  res.status(201).json(newFee);
});

// PUT update fee calculation
app.put('/api/fees/:id', (req, res) => {
  const { id } = req.params;
  const { examName, amount } = req.body;
  const index = fees.findIndex(fee => fee.id === parseInt(id));
  if (index !== -1) {
    fees[index].examName = examName;
    fees[index].amount = amount;
    res.json(fees[index]);
  } else {
    res.status(404).json({ message: 'Fee calculation not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
