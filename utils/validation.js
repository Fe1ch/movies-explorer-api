const { Joi, celebrate } = require('celebrate');
const { URL_REGEX } = require('./constants');

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(URL_REGEX).required(),
    trailerLink: Joi.string().pattern(URL_REGEX).required(),
    thumbnail: Joi.string().pattern(URL_REGEX).required(),
    owner: Joi.string().hex().length(24).required(),
    movieId: Joi.string().hex().length(24).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

module.exports = {
  validateSignin,
  validateSignup,
  validateCreateMovie,
  validateDeleteMovie,
  validateUpdateUserInfo,
};
