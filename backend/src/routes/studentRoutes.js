const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Student = require('../models/Student');
const { HomeworkSubmission } = require('../models/Homework');
const Attendance = require('../models/Attendance');

router.use(authenticate);

// GET /api/students/:id/progress - tərəqqi qrafiki üçün data
router.get('/:id/progress', async (req, res) => {
  const submissions = await HomeworkSubmission.findAll({
    where: { studentId: req.params.id },
    order: [['createdAt', 'ASC']],
  });
  const attendance = await Attendance.findAll({ where: { studentId: req.params.id } });

  const attended = attendance.filter(a => a.status === 'geldi').length;
  const total = attendance.length || 1;

  res.json({
    grades: submissions.map(s => ({ date: s.createdAt, grade: s.grade || 0 })),
    attendanceRate: Math.round((attended / total) * 100),
    totalSubmissions: submissions.length,
  });
});

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
