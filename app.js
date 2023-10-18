require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');
const handlerError = require('./middlewares/handlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = process.env;
const { DEFAULT_PORT, DEFAULT_DATABASE } = require('./utils/config');

const app = express();
app.use(requestLogger);
app.use(cors());

mongoose.connect(DB_URL || DEFAULT_DATABASE, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handlerError);

app.listen(PORT || DEFAULT_PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
