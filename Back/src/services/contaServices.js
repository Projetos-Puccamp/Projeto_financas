const db = require('../db');

module.exports = {
  ADDD: (valor, cardData) => {
    return new Promise((aceito, rejeitado) => {
      // Recupere o saldo atual da tabela
      db.query('SELECT Saldo FROM CartaoD WHERE UserID = ? AND CartaoDID = ?', [cardData.UserID, cardData.CartaoDID], (error, resultados) => {
        if (error) {
          console.log("erro de query");
          rejeitado(error);
          return;
        }

        if (resultados.length === 0) {
          console.log("length errado");
          rejeitado('Usuário não encontrado');
          return;
        }
          const saldoAtual = parseFloat(resultados[0].Saldo);
         // Calcule o novo saldo somando o saldo atual com o novo valor
          const novoSaldo = saldoAtual + valor;
          // Atualize o registro existente com o novo saldo
          db.query('UPDATE CartaoD SET Saldo = ? WHERE UserID = ? AND CartaoDID = ?', [novoSaldo,cardData.UserID, cardData.CartaoDID], (error, resultados) => {
          if (error) {
            rejeitado(error);
            return;
          }
            // Após a atualização, retorne o novo saldo atualizado
            aceito(novoSaldo);
          });
        });
      });
    },
  SUBD: (valor, cardData) => {
    return new Promise((aceito, rejeitado) => {
      // Recupere o saldo atual da tabela
      db.query('SELECT Saldo FROM CartaoD WHERE UserID = ? AND CartaoDID = ?', [cardData.UserID, cardData.CartaoDID], (error, resultados) => {
        if (error) {
          console.log("erro de query");
          rejeitado(error);
          return;
        }

        if (resultados.length === 0) {
          console.log("length errado");
          rejeitado('Usuário não encontrado');
          return;
        }
          const saldoAtual = resultados[0].Saldo;

        if(saldoAtual < valor){
          console.log("Sem saldo disponivel");
          rejeitado(error);
          return;
        }
          // Calcule o novo saldo somando o saldo atual com o novo valor
          const novoSaldo = saldoAtual - valor;
          console.log(valor);
          console.log(novoSaldo);
          // Atualize o registro existente com o novo saldo
          db.query('UPDATE CartaoD SET Saldo = ? WHERE UserID = ? AND CartaoDID = ?', [novoSaldo,cardData.UserID, cardData.CartaoDID], (error, resultados) => {
          if (error) {
            rejeitado(error);
            return;
          }

            // Após a atualização, retorne o novo saldo atualizado
            aceito(novoSaldo);
          });
        });
      });
    },
    ShowSaldo: (userID) => {
        return new Promise((aceito, rejeitado) => {

          db.query('SELECT SUM(Saldo) as saldo FROM CartaoD WHERE UserID = ?',[userID], (error, results) => {
            if (error) { rejeitado(error); return; }
            if (results.length > 0) {
              const saldo = results[0].saldo;
              aceito(saldo);
            } else { aceito(false); }
          });
        });
      },
      ShowLimite: (userID) => {
        return new Promise((aceito, rejeitado) => {

          db.query('SELECT SUM(limite) as limite FROM CartaoC WHERE UserID = ?',[userID], (error, results) => {
            if (error) { rejeitado(error); return; }
            if (results.length > 0) {
              const limite = results[0].limite;
              aceito(limite);
            } else { aceito(false); }
          });
        });
      },
      ShowGasto: (userID) => {
        return new Promise((aceito, rejeitado) => {

          db.query('SELECT SUM(gasto) as gasto FROM CartaoC WHERE UserID = ?',[userID], (error, results) => {
            if (error) { rejeitado(error); return; }
            if (results.length > 0) {
              const gasto = results[0].gasto;
              aceito(gasto);
            } else { aceito(false); }
          });
        });
      },
      SUBC: (valor, cardData) => {
        return new Promise((aceito, rejeitado) => {
          // Recupere o saldo atual da tabela
          db.query('SELECT gasto FROM CartaoC WHERE UserID = ? AND CartaoCID = ?', [cardData.UserID, cardData.CartaoCID], (error, resultados) => {
            if (error) {
              console.log("erro de query");
              rejeitado(error);
              return;
            }
    
            if (resultados.length === 0) {
              console.log("length errado");
              rejeitado('Usuário não encontrado');
              return;
            }
            const saldoAtual = resultados[0].gasto;
    
            // Calcule o novo saldo somando o saldo atual com o novo valor
            const novoSaldo = saldoAtual - valor;
    
            // Atualize o registro existente com o novo saldo
            db.query('UPDATE CartaoC SET gasto = ? WHERE UserID = ? AND CartaoCID = ?', [novoSaldo,cardData.UserID, cardData.CartaoCID], (error, resultados) => {
              if (error) {
                rejeitado(error);
                return;
              }
    
              // Após a atualização, retorne o novo saldo atualizado
              aceito(novoSaldo);
            });
          });
        });
      },
      ADDC: (valor, cardData) => {
        return new Promise((aceito, rejeitado) => {
          // Recupere o saldo atual da tabela
          db.query('SELECT gasto, limite FROM CartaoC WHERE UserID = ? AND CartaoCID = ?', [cardData.UserID, cardData.CartaoCID], (error, resultados) => {
            if (error) {
              console.log("erro de query");
              rejeitado(error);
              return;
            }
    
            if (resultados.length === 0) {
              console.log("length errado");
              rejeitado('Usuário não encontrado');
              return;
            }
            const saldoAtual = parseFloat(resultados[0].gasto);
              const novolim = saldoAtual + valor;
            if(novolim > resultados[0].limite){
              console.log("Sem limite disponivel");
              rejeitado(error);
              return;
            }
              // Calcule o novo saldo somando o saldo atual com o novo valor
              const novoSaldo = saldoAtual + valor;
    
              // Atualize o registro existente com o novo saldo
              db.query('UPDATE CartaoC SET gasto = ? WHERE UserID = ? AND CartaoCID = ?', [novoSaldo,cardData.UserID, cardData.CartaoCID], (error, resultados) => {
              if (error) {
                rejeitado(error);
                return;
              }
    
                // Após a atualização, retorne o novo saldo atualizado
                aceito(novoSaldo);
              });
            });
          });
        },
};
