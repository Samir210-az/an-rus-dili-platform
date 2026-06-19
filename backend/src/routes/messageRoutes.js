const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Message = require('../models/Message');
const { Op } = require('sequelize');

router.use(authenticate);

// GET /api/messages/:otherUserId - iki istifadəçi arasındakı söhbət
router.get('/:otherUserId', async (req, res) => {
  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        { senderId: req.user.id, receiverId: req.params.otherUserId },
        { senderId: req.params.otherUserId, receiverId: req.user.id },
      ],
    },
    order: [['createdAt', 'ASC']],
  });
  res.json(messages);
});

// POST /api/messages - mesaj göndər (yalnız müəllim <-> valideyn/admin arası)
router.post('/', async (req, res) => {
  const { receiverId, text } = req.body;
  if (!['teacher', 'parent', 'admin', 'super_admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Mesajlaşma yalnız müəllim və valideyn arasında mümkündür' });
  }
  const message = await Message.create({ senderId: req.user.id, receiverId, text });
  res.status(201).json(message);
});

router.put('/:id/read', async (req, res) => {
  const msg = await Message.findByPk(req.params.id);
  if (!msg) return res.status(404).json({ message: 'Tapılmadı' });
  msg.isRead = true;
  await msg.save();
  res.json(msg);
});

module.exports = router;
