const db = require('../db');

module.exports = {
  ADDD: (valor, cardData, motivo) => {
    return new Promise((aceito, rejeitado) => {
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
          const novoSaldo = saldoAtual + valor;
          db.query('UPDATE CartaoD SET Saldo = ? WHERE UserID = ? AND CartaoDID = ?', [novoSaldo,cardData.UserID, cardData.CartaoDID], (error, resultados) => {
          if (error) {
            rejeitado(error);
            return;
          }
          db.query('INSERT INTO TransacoesD (Detalhe, Valor,Tipo,UserID,CartaoDID) VALUES (?, ?,?,?,?)', [motivo,valor,'Entrada',cardData.UserID, cardData.CartaoDID], (error, resultados) => {
            if (error) {
              rejeitado(error);
              return;
           }
          });
            aceito(novoSaldo);
          });
        });
      });
    },
  SUBD: (valor, cardData, motivo) => {
    return new Promise((aceito, rejeitado) => {
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
          const novoSaldo = saldoAtual - valor;
          console.log(valor);
          console.log(novoSaldo);
          db.query('UPDATE CartaoD SET Saldo = ? WHERE UserID = ? AND CartaoDID = ?', [novoSaldo,cardData.UserID, cardData.CartaoDID], (error, resultados) => {
          if (error) {
            rejeitado(error);
            return;
          }
          db.query('INSERT INTO TransacoesD (Detalhe, Valor,Tipo,UserID,CartaoDID) VALUES (?,?,?,?,?)', [motivo,valor,'Saída',cardData.UserID, cardData.CartaoDID], (error, resultados) => {
            if (error) {
              rejeitado(error);
              return;
           }
          });
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
      SUBC: (valor, cardData,motivo) => {
        return new Promise((aceito, rejeitado) => {
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
            const novoSaldo = saldoAtual - valor;
            db.query('UPDATE CartaoC SET gasto = ? WHERE UserID = ? AND CartaoCID = ?', [novoSaldo,cardData.UserID, cardData.CartaoCID], (error, resultados) => {
              if (error) {
                rejeitado(error);
                return;
              }
              db.query('INSERT INTO TransacoesC (Detalhe, Valor,Tipo,UserID,CartaoCID) VALUES (?,?,?,?,?)', [motivo,valor,'Pagamento Crédito',cardData.UserID, cardData.CartaoCID], (error, resultados) => {
                if (error) {
                  rejeitado(error);
                  return;
               }
              });
              aceito(novoSaldo);
            });
          });
        });
      },
      ADDC: (valor, cardData,motivo) => {
        return new Promise((aceito, rejeitado) => {
          db.query('SELECT gasto, limite FROM CartaoC WHERE UserID = ? AND CartaoCID = ?', [cardData.UserID, cardData.CartaoCID], (error, resultados) => {
            if (error) {
              console.log("erro de query");
              rejeitado(error);
              return;
            }
            if (resultados.length === 0) {
              rejeitado('Usuário não encontrado');
              return;
            }
            const gasto = parseFloat(resultados[0].gasto);
            const limite = parseFloat(resultados[0].limite);
            const limatual = limite - gasto;
            const novogasto = gasto + valor;
            if(limatual < valor){
              console.log("Sem saldo disponivel");
              rejeitado(error);
              return;
            }
              db.query('UPDATE CartaoC SET gasto = ? WHERE UserID = ? AND CartaoCID = ?', [novogasto,cardData.UserID, cardData.CartaoCID], (error, resultados) => {
              if (error) {
                rejeitado(error);
                return;
              }
              db.query('INSERT INTO TransacoesC (Detalhe, Valor,Tipo,UserID,CartaoCID) VALUES (?, ?,?,?,?)', [motivo,valor,'Gasto Crédito',cardData.UserID, cardData.CartaoCID], (error, resultados) => {
                if (error) {
                  rejeitado(error);
                  return;
               }
              });
                aceito(novoSaldo);
              });
            });
          });
        },
};
