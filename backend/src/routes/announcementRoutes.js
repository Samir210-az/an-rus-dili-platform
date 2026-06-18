const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Announcement = require('../models/Announcement');

router.use(authenticate);

router.get('/', async (req, res) => {
  const items = await Announcement.findAll({ order: [['createdAt', 'DESC']] });
  res.json(items);
});

router.post('/', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const item = await Announcement.create({ ...req.body, authorId: req.user.id });
  res.status(201).json(item);
});

module.exports = router;
