// Get all published backend courses,
// sort them by their name,
// pick only their name and author,
// and display them

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises')
.then('Connected to the mongo-exercises db')
.catch("Can't connect to the database")

const courseSchema = new mongoose.Schema({
name: String,
author: String, 
tags: [ String ],
date: Date, 
isPublished: Boolean,
price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
console.log('Getting courses...')
return await Course
.find({ isPublished: true, tags: 'node' })
.sort({ name: 1 })
    .select({ name: 1, author: 1 })
}

async function Main() {
    const courses = await  getCourses();
    console.log(courses);
    mongoose.disconnect();
}

Main();