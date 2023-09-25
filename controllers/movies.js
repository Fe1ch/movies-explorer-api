const Movie = require('../models/movie');
const { STATUS_SUCCESS, STATUS_CREATED } = require('../utils/constants');
const ForbiddenError = require('../errors/ForbiddenError');
const { errorMessages, successMessages } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(STATUS_SUCCESS).send(movies))
    .catch(next);
};

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

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== req.user._id) {
        throw new ForbiddenError(errorMessages.MOVIE_FORBIDDEN);
      } else {
        Movie.findByIdAndDelete(req.params._id)
          .then(() => {
            res.status(STATUS_SUCCESS).send({ message: successMessages.MOVIE_DELETE });
          })
          .catch(next);
      }
    })
    .catch(next);
};
