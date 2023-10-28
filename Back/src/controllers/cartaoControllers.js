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
    console.log(limite);
    let userID = req.body.userID;
    console.log(userID);
      let user = await cartaoServices.criacartaoC(nome, limite, userID);
      res.json({ autenticado: true,
      ID: user.UserID,});
    
  }
}