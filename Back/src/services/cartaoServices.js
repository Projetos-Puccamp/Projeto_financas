const db = require('../db');

module.exports = {
    criacartaoD: (nome, userID) => {
        return new Promise((aceito, rejeitado) => {
          db.query('INSERT INTO CartaoD (UserID, Nomecartao,saldo) VALUES (?, ?,?)', [userID, nome,'0.00'], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      },
      criacartaoC: (nome,limite, userID) => {
        return new Promise((aceito, rejeitado) => {
          db.query('INSERT INTO CartaoC (UserID,limite,Nomecartao,gasto) VALUES (?, ?, ?,?)', [userID,limite, nome,'0.00'], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      }
  };