const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');

const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  errorMessages,
  successMessages,
} = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');

// GET USER INFO
module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  return User.findOne({ _id })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

// PATCH UPDATE USER INFO
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

// POST CREATE USER
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch(next);
};

// LOGIN
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError(errorMessages.EMAIL_PASSWORD_EMPTY));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY,
        {
          expiresIn: '7d',
        },
      );
      res.status(STATUS_SUCCESS).send({ message: successMessages.SIGNIN, token });
    })
    .catch(next);
};
