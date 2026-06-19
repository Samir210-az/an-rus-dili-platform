const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const ParentTip = require('../models/ParentTip');

router.use(authenticate);

router.get('/', async (req, res) => {
  const tips = await ParentTip.findAll({ order: [['createdAt', 'DESC']] });
  res.json(tips);
});

router.post('/', authorize('teacher', 'admin', 'super_admin'), async (req, res) => {
  const tip = await ParentTip.create({ ...req.body, authorId: req.user.id });
  res.status(201).json(tip);
});

module.exports = router;
