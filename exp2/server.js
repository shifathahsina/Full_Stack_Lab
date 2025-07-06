const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// GET: Show form
app.get('/', (req, res) => {
  res.render('form');
});

// POST: Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Read existing data
  const filePath = path.join(__dirname, 'data.json');
  let existingData = [];

  try {
    const fileContent = fs.readFileSync(filePath);
    existingData = JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading JSON file:', err);
  }

  // Add new data
  existingData.push(formData);

  // Save back to file
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  // Redirect to display page
  res.redirect('/display');
});

// GET: Show stored data
app.get('/display', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');
  let data = [];

  try {
    const fileContent = fs.readFileSync(filePath);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading JSON file:', err);
  }

  res.render('display', { data });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
