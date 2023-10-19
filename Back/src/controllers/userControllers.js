const UserServices = require('../services/userServices');
const nodemailer = require('nodemailer');

module.exports = {

login: async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let user = await UserServices.validarUsuario(email, senha);

    if (user) {
      // Credenciais corretas, retorna uma resposta de sucesso
      res.json({ autenticado: true,
      ID: user.UserID});
    } else {
      // Credenciais inválidas, retorna uma resposta de erro
      res.json({ autenticado: false });
    }
  },
  autoLogin: async (req, res) => {
    let user = await UserServices.validarAutoLogin();


    if (user.EmailLogin && user.Senha) {
      // Chama a função validarUsuario para verificar se o usuário existe
      let usuarioEncontrado = await UserServices.validarUsuario(user.EmailLogin, user.Senha);
        console.log(usuarioEncontrado);
      if (usuarioEncontrado) {
        // Usuário encontrado, retorna uma resposta de sucesso
        res.json({ autenticado: true });
      } else {
        // Usuário não encontrado, retorna uma resposta de erro
        res.json({ autenticado: false});
      }
    } else {
      // Credenciais inválidas da função validarAutoLogin, retorna uma resposta de erro
      res.json({ autenticado: false});
    }
  },
  cadastro: async (req, res) => {
    console.log('entrou cadastro');
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
    console.log('entrou redefinir');
    let json = { erro: '', result: {} };
    let email = req.body.email;
    
    const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: email, // Change to your recipient
  from: 'cadurockro@gmail.com', // Change to your verified sender
  subject: 'Seu código de recuperação de senha',
  text: 'Seu código é PROJETO',
  html: '<strong>Seu código é PROJETO</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
    json.result= true
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
      // Credenciais inválidas, retorna uma resposta de erro
      res.json({ autenticado: false });
    }
  },
  }