const ContaServices = require('../services/contaServices');

module.exports = {
  ADD: async (req, res) => {
        let json = { erro: '', result: {} };
        let valor = req.body.valor;
        let idUsuario = req.body.userID;

        if (valor && idUsuario) {
          try {
            // Chama o serviço para atualizar o saldo
            const novoSaldo = await ContaServices.ADD(valor, idUsuario);

            // Inclui o novo saldo na resposta JSON
            json.result = {
              valor,
              idUsuario,
              novoSaldo
            };
          } catch (error) {
            json.erro = 'Erro ao atualizar o saldo da conta';
          }
        } else {
          json.erro = 'Campos não enviados';
        }

        res.json(json);
      },
  SUB: async (req, res) => {
      let json = { erro: '', result: {} };
      let valor = req.body.valor;
      let idUsuario = req.body.userID;

      if (valor && idUsuario) {
        try {
          // Chama o serviço para atualizar o saldo
          const novoSaldo = await ContaServices.SUB(valor, idUsuario);

          // Inclui o novo saldo na resposta JSON
          json.result = {
            valor,
            idUsuario,
            novoSaldo
          };
        } catch (error) {
          json.erro = 'Erro ao atualizar o saldo da conta';
        }
      } else {
        json.erro = 'Campos não enviados';
      }

      res.json(json);
    },
    SHOW: async (req, res) => {
        let json = { erro: '', result: [] };
        let userID = req.body.userID;
        console.log(userID);
        let conta = await ContaServices.ShowSaldo(userID)
        console.log(conta);
        json.result = {
          novoSaldo: conta
        };
        res.json(json);

      },
};
