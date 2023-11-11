const { use } = require('../routes');
const cartaoServices = require('../services/cartaoServices');
const financiamentoServices = require('../services/financiamentoServices');
const UserServices = require('../services/userServices');
const nodemailer = require('nodemailer');

module.exports = {

criafinanciamento: async (req, res) => {
    let nome = req.body.nome;
    let userID = req.body.userID;
    let total = parseFloat(req.body.total);
    let juros = parseFloat(req.body.juros)/ 100 / 12;
    let parcelas = req.body.parcelas;
    let valorparcela = (total * juros) / (1 - Math.pow(1 + juros, -parcelas));
    let valorp = valorparcela.toFixed(2);
    console.log(userID);
      let user = await financiamentoServices.criafinanciamento(nome, userID, total, juros, parcelas, valorp);
      res.json({ autenticado: true,
      ID: user.UserID,});
    
  },
  listAll: async (req, res) => {
    let userID = req.body.userID;
    try {
      const results = await financiamentoServices.listAll(userID);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar cartões de débito.' });
    }
  }
}