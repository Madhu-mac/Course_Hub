const mongoose = require ("mongoose");
const express = require('express');
const { User, Course , Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt , async (req, res) =>{
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({message: "Admin doesnt exist"})
    return
  }
  res.json({
    username : admin.username
  })
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();

      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }

  }
  Admin.findOne({ username }).then(callback);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.post('/courses', authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/courses', authenticateJwt, async (req, res) =>{
  const courses = await Course.find({});
  res.json({ courses });
});

router.get('/course/:courseId', async (req, res) => {
  try{
    const courseId =req.params.courseId
    const course = await Course.findById({_id: courseId});
    console.log(course)
    res.json({course});
  }catch(e) {
    console.log("error", e.message)
  }

});

router.delete('/courses/:courseId', authenticateJwt, async (req, res) => {
  try {
    const courseId = req.params.courseId;

     const course = await Course.findById({_id: courseId});

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(403).json({ message: 'Only admins can delete courses' });
    }
    await Course.findByIdAndDelete({_id: courseId});
    res.json({ message: 'Course deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router

