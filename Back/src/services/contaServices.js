const db = require('../db');

module.exports = {
  ADD: (valor, idUsuario) => {
    return new Promise((aceito, rejeitado) => {
      // Recupere o saldo atual da tabela
      db.query('SELECT Saldo FROM UsuarioSaldo WHERE UserID = ?', idUsuario, (error, resultados) => {
        if (error) {
          rejeitado(error);
          return;
        }

        if (resultados.length === 0) {
          rejeitado('Usuário não encontrado');
          return;
        }

        const saldoAtual = resultados[0].Saldo;

        // Calcule o novo saldo somando o saldo atual com o novo valor
        const novoSaldo = saldoAtual + valor;

        // Atualize o registro existente com o novo saldo
        db.query('UPDATE UsuarioSaldo SET Saldo = ? WHERE UserID = ?', [novoSaldo, idUsuario], (error, resultados) => {
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
  SUB: (valor, idUsuario) => {
      return new Promise((aceito, rejeitado) => {
        // Recupere o saldo atual da tabela
        db.query('SELECT Saldo FROM UsuarioSaldo WHERE UsuarioSaldoID = ?', idUsuario, (error, resultados) => {
          if (error) {
            rejeitado(error);
            return;
          }

          if (resultados.length === 0) {
            rejeitado('Usuário não encontrado');
            return;
          }

          const saldoAtual = resultados[0].Saldo;

          // Calcule o novo saldo somando o saldo atual com o novo valor
          const novoSaldo = saldoAtual - valor;

          // Atualize o registro existente com o novo saldo
          db.query('UPDATE UsuarioSaldo SET Saldo = ? WHERE UsuarioSaldoID = ?', [novoSaldo, idUsuario], (error, resultados) => {
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
