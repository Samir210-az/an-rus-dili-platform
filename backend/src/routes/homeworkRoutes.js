const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { Homework, HomeworkSubmission } = require('../models/Homework');
const Student = require('../models/Student');

router.use(authenticate);

router.get('/', async (req, res) => {
  const homeworks = await Homework.findAll({ order: [['deadline', 'ASC']] });
  res.json(homeworks);
});

router.post('/', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const hw = await Homework.create({ ...req.body, teacherId: req.user.id });
  res.status(201).json(hw);
});

// Şagird cavab göndərir
router.post('/:id/submit', authorize('student'), async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });
  const submission = await HomeworkSubmission.create({
    homeworkId: req.params.id,
    studentId: student.id,
    answerText: req.body.answerText,
    answerFileUrl: req.body.answerFileUrl,
    submittedAt: new Date(),
  });
  res.status(201).json(submission);
});

// Müəllim qiymətləndirir
router.put('/submissions/:id/grade', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const { grade, feedback } = req.body;
  const submission = await HomeworkSubmission.findByPk(req.params.id);
  if (!submission) return res.status(404).json({ message: 'Tapşırıq tapılmadı' });
  await submission.update({ grade, feedback });

  // Bal toplama sistemi: qiymətə uyğun ulduz əlavə et
  const student = await Student.findByPk(submission.studentId);
  if (student && grade) {
    student.totalStars += Math.round(grade / 10);
    if (student.totalStars > 100) student.rank = 'Ustad';
    else if (student.totalStars > 50) student.rank = 'Mütəxəssis';
    await student.save();
  }

  res.json(submission);
});

module.exports = router;
