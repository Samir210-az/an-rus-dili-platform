const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Notification = require('../models/Notification');

router.use(authenticate);

router.get('/', async (req, res) => {
  const items = await Notification.findAll({
    where: { userId: req.user.id },
    order: [['createdAt', 'DESC']],
    limit: 30,
  });
  res.json(items);
});

router.put('/:id/read', async (req, res) => {
  const item = await Notification.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Tapılmadı' });
  item.isRead = true;
  await item.save();
  res.json(item);
});

module.exports = router;
