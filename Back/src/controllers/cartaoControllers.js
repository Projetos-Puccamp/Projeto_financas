const { use } = require('../routes');
const cartaoServices = require('../services/cartaoServices');
const UserServices = require('../services/userServices');
const nodemailer = require('nodemailer');

module.exports = {

criacartaoD: async (req, res) => {
    let nome = req.body.nome;
    let userID = req.body.userID;
    console.log(userID);
      let user = await cartaoServices.criacartaoD(nome, userID);
      res.json({ autenticado: true,
      ID: user.UserID,});
    
  },
  criacartaoC: async (req, res) => {
    let nome = req.body.nome;
    let limite = req.body.limite;
    let userID = req.body.userID;
      let user = await cartaoServices.criacartaoC(nome, limite, userID);
      res.json({ autenticado: true,
      ID: user.UserID,});
    
  },
  listAll: async (req, res) => {
    let userID = req.body.userID;
    try {
      const results = await cartaoServices.listAll(userID);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar cartões de débito.' });
    }
  },
  listAllC: async (req, res) => {
    let userID = req.body.userID;
    try {
      const results = await cartaoServices.listAllC(userID);
      const cartoes = results.map((cartao) => ({
        ...cartao,
        limiteDisponivel: cartao.limite - cartao.gasto,
      }));
      res.status(200).json(cartoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar cartões de crédito.' });
    }
  }
}