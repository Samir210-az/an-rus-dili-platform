const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { Material, Question, QuizAttempt } = require('../models/Material');
const Student = require('../models/Student');

router.use(authenticate);

// GET /api/materials?category=oxu&level=A1 - materialları filtrlə
router.get('/', async (req, res) => {
  const { category, level } = req.query;
  const where = {};
  if (category) where.category = category;
  if (level) where.level = level;
  const materials = await Material.findAll({ where, order: [['createdAt', 'DESC']] });
  res.json(materials);
});

router.get('/:id', async (req, res) => {
  const material = await Material.findByPk(req.params.id);
  if (!material) return res.status(404).json({ message: 'Material tapılmadı' });
  const questions = await Question.findAll({ where: { materialId: material.id } });
  res.json({ material, questions });
});

// Müəllim/Admin material yaradır (mətn, dialoq, qayda, fayl və s.)
router.post('/', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const material = await Material.create({ ...req.body, teacherId: req.user.id });
  res.status(201).json(material);
});

router.put('/:id', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const material = await Material.findByPk(req.params.id);
  if (!material) return res.status(404).json({ message: 'Material tapılmadı' });
  await material.update(req.body);
  res.json(material);
});

router.delete('/:id', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const material = await Material.findByPk(req.params.id);
  if (!material) return res.status(404).json({ message: 'Material tapılmadı' });
  await material.destroy();
  res.json({ message: 'Material silindi' });
});

// Müəllim materiala sual (test/krossvord/boşluq doldurma) əlavə edir
router.post('/:id/questions', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const question = await Question.create({ ...req.body, materialId: req.params.id });
  res.status(201).json(question);
});

// Şagird quiz cavablarını göndərir - avtomatik qiymətləndirmə + ulduz toplama
router.post('/:id/submit-quiz', authorize('student'), async (req, res) => {
  const { answers } = req.body; // { questionId: cavab }
  const questions = await Question.findAll({ where: { materialId: req.params.id } });

  let score = 0;
  questions.forEach(q => {
    const given = (answers[q.id] || '').toString().trim().toLowerCase();
    const correct = q.correctAnswer.toString().trim().toLowerCase();
    if (given === correct) score += q.points;
  });

  const student = await Student.findOne({ where: { userId: req.user.id } });
  const attempt = await QuizAttempt.create({
    studentId: student.id,
    materialId: req.params.id,
    score,
    totalQuestions: questions.length,
    answers,
  });

  // Bal/ulduz sistemi: hər 10 xal = 1 ulduz
  student.totalStars += Math.floor(score / 10);
  if (student.totalStars > 100) student.rank = 'Ustad';
  else if (student.totalStars > 50) student.rank = 'Mütəxəssis';
  await student.save();

  res.status(201).json({ attempt, newStars: student.totalStars, rank: student.rank });
});

module.exports = router;
