const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/userControllers');
const ContaControllers = require('./controllers/contaControllers');
const CartaoControllers = require('./controllers/cartaoControllers');
const financiamentoControllers = require('./controllers/financiamentoControllers');

//rotas de usuario
router.post('/users/login', UserControllers.login);
router.get('/users/loginauto', UserControllers.autoLogin);
router.post('/users/cadastro', UserControllers.cadastro);
router.post('/users/redefinir', UserControllers.redefinir);
router.post('/users/redefinir2', UserControllers.redefinir2);

//rotas de conta
router.post('/conta/addD', ContaControllers.ADDD);
router.post('/conta/subD', ContaControllers.SUBD);
router.post('/conta/addC', ContaControllers.ADDC);
router.post('/conta/subC', ContaControllers.SUBC);
router.post('/conta/saldo', ContaControllers.SHOW);
router.post('/conta/credito', ContaControllers.SHOWC);
router.post('/conta/gasto', ContaControllers.SHOWG);

//rota cartao
router.post('/cartao/criacartaoD', CartaoControllers.criacartaoD);
router.post('/cartao/criacartaoC', CartaoControllers.criacartaoC);
router.post('/cartao/list', CartaoControllers.listAll);
router.post('/cartao/listC', CartaoControllers.listAllC);

//rota de financiamento
router.post('/financiamento/criafinanciamento', financiamentoControllers.criafinanciamento);
router.post('/financiamento/listfinanciamento', financiamentoControllers.listAll);

module.exports = router;