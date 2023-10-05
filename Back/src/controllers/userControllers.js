const UserServices = require('../services/userServices');
module.exports = {

login: async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let user = await UserServices.validarUsuario(email, senha);

    if (user) {
      // Credenciais corretas, retorna uma resposta de sucesso
      res.json({ autenticado: true });
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
  }