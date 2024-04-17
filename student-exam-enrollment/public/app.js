const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

let enrollments = [];

// GET all enrollments
app.get('/api/enrollments', (req, res) => {
  res.json(enrollments);
});

// POST new enrollment
app.post('/api/enrollments', (req, res) => {
  const { studentName, examName } = req.body;
  const newEnrollment = { id: enrollments.length + 1, studentName, examName };
  enrollments.push(newEnrollment);
  res.status(201).json(newEnrollment);
});

// PUT update enrollment
app.put('/api/enrollments/:id', (req, res) => {
  const { id } = req.params;
  const { studentName, examName } = req.body;
  const index = enrollments.findIndex(enrollment => enrollment.id === parseInt(id));
  if (index !== -1) {
    enrollments[index].studentName = studentName;
    enrollments[index].examName = examName;
    res.json(enrollments[index]);
  } else {
    res.status(404).json({ message: 'Enrollment not found' });
  }
});

// DELETE enrollment
app.delete('/api/enrollments/:id', (req, res) => {
  const { id } = req.params;
  enrollments = enrollments.filter(enrollment => enrollment.id !== parseInt(id));
  res.json({ message: 'Enrollment deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
