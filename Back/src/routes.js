const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/userControllers');
const ContaControllers = require('./controllers/contaControllers');

//rotas de usuario
router.post('/users/login', UserControllers.login);
router.get('/users/loginauto', UserControllers.autoLogin);

//rotas de conta
router.post('/conta/add', ContaControllers.ADD);

module.exports = router;
