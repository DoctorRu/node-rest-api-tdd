const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB: ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course( {
        name: 'Angular',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    console.log('Saving course')
    const result = await course.save();
    console.log(result);
}

async function getCourses() {

    const pageNumber = 2;
    const pageSize = 10;

    console.log('Getting courses')
    courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 }) // 1: Ascending, -1: Descending
        .select({ name: 1, tags: 1 }) // Filter fields

    console.log(courses);
    mongoose.disconnect();
}

// createCourse();
getCourses();














