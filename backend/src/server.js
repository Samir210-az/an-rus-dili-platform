require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/homeworks', homeworkRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/students', studentRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK', project: 'AN Rus Dili Platforması' }));

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda işləyir`));
}).catch(err => console.error('DB qoşulma xətası:', err));

module.exports = app;
