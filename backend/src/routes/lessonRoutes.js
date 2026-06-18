const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Lesson = require('../models/Lesson');
const Attendance = require('../models/Attendance');

router.use(authenticate);

// GET /api/lessons - cədvəli görmək (hamı)
router.get('/', async (req, res) => {
  const lessons = await Lesson.findAll({ order: [['date', 'ASC']] });
  res.json(lessons);
});

// POST /api/lessons - dərs yaratmaq (admin/teacher)
router.post('/', authorize('admin', 'super_admin', 'teacher'), async (req, res) => {
  const lesson = await Lesson.create(req.body);
  res.status(201).json(lesson);
});

router.put('/:id', authorize('admin', 'super_admin', 'teacher'), async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Dərs tapılmadı' });
  await lesson.update(req.body);
  res.json(lesson);
});

router.delete('/:id', authorize('admin', 'super_admin', 'teacher'), async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Dərs tapılmadı' });
  await lesson.destroy();
  res.json({ message: 'Dərs silindi' });
});

// POST /api/lessons/:id/attendance - iştirak qeydi
router.post('/:id/attendance', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const { studentId, status } = req.body;
  const record = await Attendance.create({ lessonId: req.params.id, studentId, status });
  res.status(201).json(record);
});

module.exports = router;
