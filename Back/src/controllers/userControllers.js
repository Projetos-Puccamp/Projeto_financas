const { use } = require('../routes');
const UserServices = require('../services/userServices');

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

        res.json({ autenticado: true, usuarioEncontrado});
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
  
    if (!email) {
      // Se o e-mail não estiver presente, envie uma resposta de erro
      json.erro = 'E-mail não fornecido';
      return res.json(json);
    }
  
    const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const msg = {
  to: email, // Change to your recipient
  from: 'cadurockro@gmail.com', // Change to your verified sende
  subject: 'Seu código para redefinir senha',
  text: 'Seu código é PROJETO (atente-se as letras maiusculas)',
  html: '<strong>Seu código é PROJETO (atente-se as letras maiusculas)</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
    let json = { erro: false, result: {} };
  })
  .catch((error) => {
    console.log("email not sent");
    console.error(error)
  })
  
    res.json(json);
  },
   redefinir2: async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let cod = req.body.cod;
    console.log("redefinir2");
    if(cod == 'PROJETO'){
      let user = await UserServices.atualizarSenha(email, senha);
      res.json({ autenticado: true,
      ID: user.UserID,});
    } else {
      res.json({ autenticado: false });
    }
  },
}