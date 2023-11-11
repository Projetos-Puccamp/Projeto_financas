const db = require('../db');

module.exports = {
    criafinanciamento: (nome, userID, total, juros, parcelas, valorparcela) => {
        return new Promise((aceito, rejeitado) => {
          db.query('INSERT INTO Financiamento (Nomefinan, UserID, ValorTotal, ValorParcela, QuantidadeParcelas, Juros, ParcelasPagas) VALUES (?,?,?,?,?,?,?)', [nome, userID, total, valorparcela,parcelas,juros,'0'], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
        });
      },
      listAll: (userID) => {
        return new Promise((aceito, rejeitado) => {
          db.query(`SELECT * FROM Financiamento WHERE UserID = ${userID}`, (err, results) => {
            if (err) {
              rejeitado(err); // Rejeita a promessa em caso de erro
            } else {
              aceito(results); // Resolve a promessa com os resultados da consulta
            }
          });
        });
      }
  };