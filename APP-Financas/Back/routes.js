const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/userControllers');

//rotas de usuario
router.post('/users/login', UserControllers.login);

module.exports = router;
