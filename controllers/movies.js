const Movie = require('../models/movie');
const { STATUS_SUCCESS, STATUS_CREATED } = require('../utils/constants');
const ForbiddenError = require('../errors/ForbiddenError');

// GET ALL CARDS
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(STATUS_SUCCESS).send(movies))
    .catch(next);
};

// POST CREATE CARD
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch(next);
};

// DELETE CARD
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить карточку фильма другого пользователя');
      } else {
        Movie.findByIdAndDelete(req.params._id)
          .then(() => {
            res.status(STATUS_SUCCESS).send({ message: `Карточка фильма ${movie} удалена` });
          })
          .catch(next);
      }
    })
    .catch(next);
};
