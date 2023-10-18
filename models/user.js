const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password, next) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) { // не нашёлся — отклоняем промис
        return Promise.reject(
          new UnauthorizedError('Неправильные почта или пароль 1'),
        );
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) { // отклоняем промис
          return Promise.reject(
            new UnauthorizedError('Неправильные почта или пароль 2'),
          );
        }
        return user;
      });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
