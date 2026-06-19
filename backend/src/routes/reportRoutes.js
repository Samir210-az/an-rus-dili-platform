const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const { authenticate } = require('../middleware/auth');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const { HomeworkSubmission } = require('../models/Homework');

router.use(authenticate);

// GET /api/reports/student/:id/pdf - valideyn ucun PDF hesabat
router.get('/student/:id/pdf', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Şagird tapılmadı' });

  const attendance = await Attendance.findAll({ where: { studentId: student.id } });
  const submissions = await HomeworkSubmission.findAll({ where: { studentId: student.id } });

  const attended = attendance.filter(a => a.status === 'geldi').length;
  const attendanceRate = attendance.length ? Math.round((attended / attendance.length) * 100) : 0;
  const avgGrade = submissions.length
    ? Math.round(submissions.reduce((s, x) => s + (x.grade || 0), 0) / submissions.length)
    : 0;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=hesabat-${student.firstName}.pdf`);

  const doc = new PDFDocument();
  doc.pipe(res);

  doc.fontSize(20).text('AN Mərkəzi — Şagird Hesabatı', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Ad Soyad: ${student.firstName} ${student.lastName}`);
  doc.text(`Səviyyə: ${student.level}`);
  doc.text(`Qrup: ${student.groupName || '-'}`);
  doc.text(`Ulduzlar: ${student.totalStars} (${student.rank})`);
  doc.moveDown();
  doc.text(`İştirak faizi: ${attendanceRate}%`);
  doc.text(`Tamamlanmış tapşırıqlar: ${submissions.length}`);
  doc.text(`Orta qiymət: ${avgGrade}`);
  doc.moveDown();
  doc.fontSize(10).text(`Hesabat tarixi: ${new Date().toLocaleDateString('az-AZ')}`, { align: 'right' });
  doc.text('By s_akhundoff', { align: 'center' });

  doc.end();
});

module.exports = router;
