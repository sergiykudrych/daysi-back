require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const errormiddleware = require('./middlewares/error-middleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://daysi.netlify.app', // ваш сайт
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Разрешаем запросы с источником null (например, в случае локальных файлов)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        // Если источник в списке разрешенных, разрешаем запрос
        callback(null, true);
      } else {
        // Если источник не разрешен, отклоняем запрос
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Если нужно передавать учетные данные
  })
);
app.use(express.json({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());
app.use('/api', router);
app.use(errormiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});

    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
