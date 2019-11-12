console.log("running");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB: ", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  author: String,
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: "A course should have at least one tag."
    }
  },
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  date: { type: Date, default: Date.now },
  releaseDate: { type: Date, default: Date.now },
  isPublished: Boolean,
  updatedAt: { type: Date, default: Date.now }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  // const course = new Course( {
  //     name: 'Node.js',
  //     author: 'Mosh',
  //     tags: ['node', 'backend'],
  //     isPublished: true
  // });

  const course = new Course({
    name: "Ruby 2",
    author: "Will",
    category: "web",
    tags: ["ruby", "backend"],
    isPublished: true,
    price: 22
  });

  try {
    console.log("Saving course");
    const result = await course.save();
    console.log(result);
    await mongoose.disconnect();
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
    await mongoose.disconnect();
  }
}

async function getCourses() {
  console.log("Getting courses");
  courses = await Course.find({ isPublished: true })
    .limit(10)
    .sort({ name: 1 }) // 1: Ascending, -1: Descending
    .select({ name: 1, tags: 1, author: 1 }); // Filter fields

  console.log(courses);
  await mongoose.disconnect();
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) {
    console.log("Course not found!");
    return;
  } else {
    console.log("Updating course...");
    course.author = "Moooosh";
    const result = await course.save();
    console.log(result);
  }
  mongoose.disconnect();
}

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  if (!course) {
    console.log("Course not found!");
    return;
  } else {
    console.log("Deleting course...");
    console.log(course);
  }
  mongoose.disconnect();
}

createCourse();
// updateCourse('5dc8370d923af412f5cfe05e');
// removeCourse('5dc837ccc436081358266654');
// getCourses();
