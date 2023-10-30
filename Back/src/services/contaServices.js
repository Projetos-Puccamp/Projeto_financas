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
        const saldoAtual = resultados[0].Saldo;

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

          db.query('SELECT * FROM UsuarioSaldo where UserID = ?',[userID], (error, results) => {
            if (error) { rejeitado(error); return; }
            if (results.length > 0) {
              const saldo = results[0].Saldo;
              aceito(saldo);
            } else { aceito(false); }
          });
        });
      },
};
