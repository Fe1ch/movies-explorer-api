const router = require('express').Router();

// IMPORT CONTROLLERS
const { getUserInfo, updateUserInfo } = require('../controllers/users');

const { validateUpdateUserInfo } = require('../utils/validation');

router.get('/users/me', getUserInfo);

router.patch('/users/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
