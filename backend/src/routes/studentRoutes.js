const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Student = require('../models/Student');

router.use(authenticate);

router.get('/', authorize('admin', 'super_admin', 'teacher'), async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

router.get('/me', authorize('student'), async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });
  res.json(student);
});

router.put('/:id', authorize('admin', 'super_admin'), async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Şagird tapılmadı' });
  await student.update(req.body);
  res.json(student);
});

router.delete('/:id', authorize('admin', 'super_admin'), async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Şagird tapılmadı' });
  await student.destroy();
  res.json({ message: 'Şagird silindi' });
});

module.exports = router;
