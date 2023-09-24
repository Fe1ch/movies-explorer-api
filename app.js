require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const handlerError = require('./middlewares/handlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(requestLogger);
app.use(cors());

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/moviesdb',
} = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
