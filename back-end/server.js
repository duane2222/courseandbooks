const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/bookscourses', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const bookSchema = new mongoose.Schema({
  name: String,
  price: String,
  course: String
});

// create a virtual paramter that turns the default _id field into id
bookSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
bookSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Book = mongoose.model('Book', bookSchema);

const courseSchema = new mongoose.Schema({
  name: String,
  semester: String,
  teacher: String
});

// create a virtual paramter that turns the default _id field into id
courseSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
courseSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Course = mongoose.model('Course', courseSchema);

app.get('/api/books', async (req, res) => {
  try {
    let books = await Book.find();
    res.send({
      books: books
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/books', async (req, res) => {
  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    course: req.body.course
  });
  try {
    await book.save();
    res.send({
      book: book
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});





app.get('/api/courses', async (req, res) => {
  try {
    let courses = await Course.find();
    res.send({
      courses: courses
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/courses', async (req, res) => {
  const course = new Course({
    name: req.body.name,
    semester: req.body.semester,
    teacher: req.body.teacher
  });
  try {
    await course.save();
    res.send({
      course: course
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));