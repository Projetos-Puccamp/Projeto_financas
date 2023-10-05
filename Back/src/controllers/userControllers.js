const UserServices = require('../services/userServices');
module.exports = {

login: async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let user = await UserServices.validarUsuario(email, senha);

    if (user) {
      // Credenciais corretas, retorna uma resposta de sucesso
      res.json({ autenticado: true, NvP: vr, Local: l, id: user.idUsuario });
    } else {
      // Credenciais inválidas, retorna uma resposta de erro
      res.json({ autenticado: false });
    }
  },
  }