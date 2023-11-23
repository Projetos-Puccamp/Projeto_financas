const { use } = require('../routes');
const UserServices = require('../services/userServices');
const nodemailer = require('nodemailer');

module.exports = {

login: async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let S_N = req.body.S_N;
    let user = await UserServices.validarUsuario(email, senha);
    if(S_N == false){
      await UserServices.setS_NF(email, senha, S_N);
    } else{
      await UserServices.setS_NT(email, senha, S_N)
    }
    if (user) {
      res.json({ autenticado: true,
      ID: user.UserID});
    } else {  
      res.json({ autenticado: false });
    }
  },
  autoLogin: async (req, res) => {
    let user = await UserServices.validarAutoLogin();
    console.log("User para AutoLogin:" + user);
    if (user) {
      let usuarioEncontrado = await UserServices.validarUsuario(user[0].EmailLogin, user[0].Senha);
      if (usuarioEncontrado.S_N == 'true') {
        res.json({ autenticado: true });
      } else {
        res.json({ autenticado: false});
      }
    } else {
      res.json({ autenticado: false});
    }
  },
  cadastro: async (req, res) => {
    console.log('Rota: entrou no controlador Cadastro');
    let json = { erro: '', result: {} };
    let email = req.body.email;
    let senha = req.body.senha;
    if (email && senha) {
      let UserID = await UserServices.cadastro(email, senha);
      json.result = {
        codigo: UserID,
        autenticado: true
      };
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  redefinir: async (req, res) => {
    console.log('Rota: entrada no controlador Redefinir');
    let json = { erro: '', result: {} };
    let email = req.body.email;
    const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: email,
  from: 'cadurockro@gmail.com',
  subject: 'Codigo para redefinir senha projeto finanças',
  text: 'Seu código é PROJETO (atento a letras maiusculas)',
  html: '<strong>Seu código é PROJETO (atento a letras maiusculas)</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
    json.result = true;
  })
  .catch((error) => {
    console.error(error)
  })
  res.json(json);
  },
  redefinir2: async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let cod = req.body.cod;
    if(cod == 'PROJETO'){
      let user = await UserServices.atualizarSenha(email, senha);
      res.json({ autenticado: true,
      ID: user.UserID,});
    } else {
      res.json({ autenticado: false });
    }
  },
}