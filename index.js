const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
};

// GET
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// DYNAMIC ROUTE
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('This course does not exist');
  }
  res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
});

// POST
app.post('/api/courses', (req, res) => {
  const result = validateCourse(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// PUT
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('This course does not exist');
  }

  const result = validateCourse(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

// DELETE
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('This course does not exist');
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
