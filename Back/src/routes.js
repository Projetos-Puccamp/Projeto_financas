const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/userControllers');
const ContaControllers = require('./controllers/contaControllers');
const CartaoControllers = require('./controllers/cartaoControllers');

//rotas de usuario
router.post('/users/login', UserControllers.login);
router.get('/users/loginauto', UserControllers.autoLogin);
router.post('/users/cadastro', UserControllers.cadastro);
router.post('/users/redefinir', UserControllers.redefinir);
router.post('/users/redefinir2', UserControllers.redefinir2);

//rotas de conta
router.post('/conta/add', ContaControllers.ADD);
router.post('/conta/sub', ContaControllers.SUB);
router.post('/conta/saldo', ContaControllers.SHOW);

//rota cartao
router.post('/cartao/criacartaoD', CartaoControllers.criacartaoD);
router.post('/cartao/criacartaoC', CartaoControllers.criacartaoC);
router.post('/cartao/list', CartaoControllers.listAll);

module.exports = router;