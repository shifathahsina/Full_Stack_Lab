// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Student = require('./models/Student');

const app = express();

mongoose.connect('mongodb+srv://mohamudhast46:1234@studentdetails.puqulbz.mongodb.net/studentDB', {
  
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));



// Route to form
app.get('/', (req, res) => {
  res.render('form', { student: null }); 
});


// Create student
app.post('/students', async (req, res) => {
  const { name, email, dept } = req.body;
  await Student.create({ name, email, dept });
  res.redirect('/students');
});

// Read all students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.render('students', { students });
});



// Update student
app.put('/students/:id', async (req, res) => {
  const { name, email,dept } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, email, dept });
  res.redirect('/students');
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
