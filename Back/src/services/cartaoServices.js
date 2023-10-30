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
      },
      listAll: (userID) => {
        return new Promise((aceito, rejeitado) => {
          db.query(`SELECT * FROM CartaoD WHERE UserID = ${userID}`, (err, results) => {
            if (err) {
              rejeitado(err); // Rejeita a promessa em caso de erro
            } else {
              aceito(results); // Resolve a promessa com os resultados da consulta
            }
          });
        });
      },
      listAllC: (userID) => {
        return new Promise((aceito, rejeitado) => {
          db.query(`SELECT * FROM CartaoC WHERE UserID = ${userID}`, (err, results) => {
            if (err) {
              rejeitado(err); // Rejeita a promessa em caso de erro
            } else {
              aceito(results); // Resolve a promessa com os resultados da consulta
            }
          });
        });
      }
  };