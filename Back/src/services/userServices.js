const db = require('../db');

module.exports = {

    validarUsuario: (email, senha) => {
        return new Promise((aceito, rejeitado) => {

          db.query('SELECT * FROM Usuario WHERE EmailLogin =? AND Senha = ?', [email, senha], (error, results) => {
            if (error) { rejeitado(error); return; }
            if (results.length > 0) { 
              aceito(results[0]);
            } else { aceito(false); }
          });
        });
      },
      validarAutoLogin: () => {
        return new Promise((aceito, rejeitado) => {
          db.query('SELECT * FROM Usuario WHERE S_N = ?', ['true'], (error, results) => {
            if (error) {
              rejeitado(error);
              return;
            }
            if (results.length > 0) {
              aceito(results);
            } else {
              console.log("AutoLogin não validado");
              aceito(null);
            }
          });
        });
      },
      cadastro: (email, senha) => {
        return new Promise((aceito, rejeitado) => {
          db.query('INSERT INTO Usuario (EmailLogin, Senha) VALUES (?, ?)', [email, senha], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      },
      atualizarSenha: (email, senha) => {
        return new Promise((aceito, rejeitado) => {
          db.query('UPDATE Usuario SET Senha = ? where EmailLogin = ?', [senha, email], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      },
      setS_NF: (email, senha, S_N) => {
        return new Promise((aceito, rejeitado) => {
          db.query('UPDATE Usuario SET S_N = ? Where Senha = ? and EmailLogin = ?', ['false', senha, email], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      },
      setS_NT: (email, senha, S_N) => {
        return new Promise((aceito, rejeitado) => {
          db.query('UPDATE Usuario SET S_N = ? Where Senha = ? and EmailLogin = ?', ['true', senha, email], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      },

}