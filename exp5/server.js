const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const DATA_FILE = './data/todos.json';

// Load todos
app.get('/api/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.json(JSON.parse(data));
  });
});

// Save todos
app.post('/api/todos', (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Error saving file');
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
