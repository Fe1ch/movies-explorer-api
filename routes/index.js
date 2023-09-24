const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const signin = require('./signin');
const signup = require('./signup');
const notFound = require('./notFound');
const auth = require('../middlewares/auth');

router.use(signin);
router.use(signup);

router.use(auth, usersRoutes);
router.use(auth, moviesRoutes);
router.use(auth, notFound);

module.exports = router;
