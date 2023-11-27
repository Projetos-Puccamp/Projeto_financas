const { use } = require('../routes');
const cartaoServices = require('../services/cartaoServices');
const contaServices = require('../services/contaServices');

module.exports = {

criacartaoD: async (req, res) => {
    let nome = req.body.nome;
    let userID = req.body.userID;
    console.log(userID);
      let user = await cartaoServices.criacartaoD(nome, userID);
      res.json({ autenticado: true,
      ID: user.UserID,});
    
  },
  criacartaoC: async (req, res) => {
    let nome = req.body.nome;
    let limite = req.body.limite;
    let userID = req.body.userID;
      let user = await cartaoServices.criacartaoC(nome, limite, userID);
      res.json({ autenticado: true,
      ID: user.UserID,});
    
  },
  listAll: async (req, res) => {
    let userID = req.body.userID;
    try {
      const results = await cartaoServices.listAll(userID);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar cartões de débito.' });
    }
  },
  listAllC: async (req, res) => {
    let userID = req.body.userID;
    try {
      const results = await cartaoServices.listAllC(userID);
      const cartoes = results.map((cartao) => ({
        ...cartao,
        limiteDisponivel: cartao.limite - cartao.gasto,
      }));
      res.status(200).json(cartoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar cartões de crédito.' });
    }
  },
  listHistD: async (req, res) => {
    let cardData = req.body.cardData;
    try {
      const results = await cartaoServices.listHistD(cardData);
      console.log(results);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar historico.' });
    }
  },
  listHistC: async (req, res) => {
    let cardData = req.body.cardData;
    try {
      const results = await cartaoServices.listHistC(cardData);
      console.log(results);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar historico.' });
    }
  },
  salario: async (req, res) => {
    let cardData = req.body.cardData;
    let valor = req.body.valor;
    let dia = req.body.dia;
    try {
      console.log("salario controler: " + cardData.UserID);
      await cartaoServices.salario(cardData, valor, dia);
      const results = "A";
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao att salario.' });
    }
  },
  init: async (req,res) =>{
    try {
      const dataAtual = new Date();
      const dataAtualApenasData = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());


      let allS = await cartaoServices.initV(dataAtualApenasData);
      
      for (const row of allS) {
        await contaServices.ADDD(row.Valor, { UserID: row.UserID, CartaoDID: row.CartaoDID }, 'Lançamento de Salário');
        
      }
      await cartaoServices.initA(dataAtualApenasData);
      console.log("Dados obtidos com sucesso:", allS);
  
      // Responda ao cliente com os dados (opcional)
      res.status(200).json({ dados: allS });
    } catch (error) {
      console.error('Erro ao obter dados:', error);
  
      // Responda ao cliente com um erro (status 500 para erro interno do servidor)
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
}
