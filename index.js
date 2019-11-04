const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
]
app.get('/', (req, res) => {
    res.send('Pong!!!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found!')   
    res.send(course);
})

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
})

app.get('/api/posts', (req, res) => {
    res.send(req.query);
})

const port = process.env.EXPRESS_PORT || 3000
app.listen(3000, () => console.log(`Listening on port ${port}...`));
