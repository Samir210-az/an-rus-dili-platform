const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// POST /api/upload - tək fayl yükləmə (şəkil/səs/PDF)
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Fayl seçilməyib' });
  res.json({
    message: 'Fayl yükləndi',
    fileUrl: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
  });
});

module.exports = router;
