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

const allowedOrigins = ['http://localhost:3000', 'https://daysi.netlify.app'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
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

// app.use('/images', express.static(path.join(__dirname, 'images')));
