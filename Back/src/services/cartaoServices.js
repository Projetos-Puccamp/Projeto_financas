const db = require('../db');

module.exports = {
    criacartaoD: (nome, userID) => {
        return new Promise((aceito, rejeitado) => {
          db.query('INSERT INTO CartaoD (UserID, Nomecartao) VALUES (?, ?)', [userID, nome], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      },
  };