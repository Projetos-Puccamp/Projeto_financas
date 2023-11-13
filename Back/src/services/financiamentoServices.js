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
      },

      RealizarPagamento: (finanId) => {
        console.log('Adicionando uma parcela paga para o Financiamento com ID:', finanId);
      
        return new Promise((resolve, reject) => {
          db.query(`UPDATE Financiamento SET ParcelasPagas = ParcelasPagas + 1 WHERE FinanciamentoID = ${finanId}`, (err, results) => {
            if (err) {
              console.error('Erro ao executar a query de atualização:', err);
              reject(err); // Rejeita a promessa em caso de erro
            } else {
              console.log('Atualização bem-sucedida:', results);
              resolve(results); // Resolve a promessa com os resultados da atualização
            }
          });
        });
      },

      AtualizarFinanciamento: (novoparcela,finanId,NovonumMeses) => {
        console.log('Atualizando Financiamento com ID:', finanId);
        console.log('Novo Número de Meses:', NovonumMeses);
        console.log('Nova Prestação:', novoparcela);
      
        return new Promise((resolve, reject) => {
          db.query(`UPDATE Financiamento SET ValorParcela = ${novoparcela}, QuantidadeParcelas = ${NovonumMeses} WHERE FinanciamentoID = ${finanId}`, (err, results) => {
            if (err) {
              console.error('Erro ao executar a query de atualização:', err);
              reject(err); // Rejeita a promessa em caso de erro
            } else {
              console.log('Atualização bem-sucedida:', results);
              resolve(results); // Resolve a promessa com os resultados da atualização
            }
          });
        });
      }
  };