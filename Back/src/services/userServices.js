const db = require('../db');

module.exports = {

    validarUsuario: (email, senha) => {
        return new Promise((aceito, rejeitado) => {

          db.query('SELECT * FROM Conta WHERE EmailLogin =? AND Senha = ?', [email, senha], (error, results) => {
            if (error) { rejeitado(error); return; }
            if (results.length > 0) {
              aceito(results[0]);
            } else { aceito(false); }
          });
        });
      },
      validarAutoLogin: () => {
        return new Promise((aceito, rejeitado) => {
          db.query('SELECT EmailLogin, Senha FROM conta WHERE S_N = ?', ['S'], (error, results) => {
            if (error) {
              rejeitado(error);
              return;
            }
            if (results.length > 0) {
              aceito(results[0]);
            } else {
              aceito(null);
            }
          });
        });
      },

}