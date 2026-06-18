const cron = require('node-cron');
const { Op } = require('sequelize');
const Lesson = require('../models/Lesson');
const { Homework } = require('../models/Homework');
const Notification = require('../models/Notification');
const Student = require('../models/Student');
const User = require('../models/User');
const { sendEmail } = require('./emailService');

// Hər 15 dəqiqədə bir dərs xatırlatmalarını yoxla (dərsdən 2 saat əvvəl)
function startReminderJobs() {
  cron.schedule('*/15 * * * *', async () => {
    try {
      const now = new Date();
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      const lessons = await Lesson.findAll({
        where: { date: twoHoursLater.toISOString().slice(0, 10) },
      });

      for (const lesson of lessons) {
        const students = await Student.findAll({ where: { groupName: lesson.groupName } });
        for (const student of students) {
          const user = await User.findByPk(student.userId);
          if (!user) continue;
          await Notification.create({
            userId: user.id,
            type: 'lesson_reminder',
            title: 'Dərs xatırlatması',
            message: `"${lesson.topic}" dərsi 2 saata başlayır (${lesson.startTime}).`,
          });
          if (user.email) {
            await sendEmail(user.email, 'Dərs xatırlatması',
              `<p>Salam, "${lesson.topic}" dərsi 2 saata başlayır.</p>`);
          }
        }
      }

      // Ev tapşırığı son tarix xəbərdarlığı (24 saat qalanda)
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const homeworks = await Homework.findAll({
        where: { deadline: { [Op.between]: [now, tomorrow] } },
      });
      for (const hw of homeworks) {
        const students = await Student.findAll({ where: { groupName: hw.groupName } });
        for (const student of students) {
          await Notification.create({
            userId: student.userId,
            type: 'homework_deadline',
            title: 'Tapşırığın son tarixi yaxınlaşır',
            message: `"${hw.title}" tapşırığının son tarixi 24 saat qaldı!`,
          });
        }
      }
    } catch (err) {
      console.error('Cron xətası:', err.message);
    }
  });
}

module.exports = { startReminderJobs };
