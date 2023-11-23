import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
  const AcompanhaFinan = ({ route, navigation }) => {
  const { cardData } = route.params;
  const [parcelasPagas, setParcelasPagas] = useState(cardData.ParcelasPagas);
  const [valorPagamento, setValorPagamento] = useState('');
  const [novoPrazo, setNovoPrazo] = useState('');

  const realizarPagamento = () => {
    const Pagamento ={
      FinanId: route.params.cardData.FinanciamentoID,
    };
    let NumParcelas = parseInt(route.params.cardData.QuantidadeParcelas);
    let Pagas  = parseInt(route.params.cardData.ParcelasPagas);

    console.log("sssssss"+NumParcelas+"adsad"+Pagas);
    if(NumParcelas==Pagas){
      alert('Financiamento quitado!!!');
    }else{

   
    fetch('http://192.168.0.104:3001/api/financiamento/pagarfinan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Pagamento),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('A resposta da API não foi bem-sucedida');
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert('Parcela Paga!');
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert('Erro ao cadastrar Financiamento, verifique os dados e tente novamente!');
      });
    }
  };

  const aumentarPrazo = () => {
    const aumentoPrazo ={
      FinanId: route.params.cardData.FinanciamentoID,
      ValorPagamento: valorPagamento,
      NumMeses: route.params.cardData.QuantidadeParcelas,
      Juros:    route.params.cardData.Juros,
      NumMesesE: novoPrazo,
      ValorT:   route.params.cardData.ValorTotal,
    };
    console.log("sssssss"+aumentoPrazo.NumMeses+aumentoPrazo.FinanId);
    fetch('http://192.168.0.104:3001/api/financiamento/estender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aumentoPrazo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('A resposta da API não foi bem-sucedida');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Financiamento cadastrado com sucesso!');
        Alert.alert('Financiamento estendido com sucesso!');
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert('Erro ao cadastrar Financiamento, verifique os dados e tente novamente!');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Detalhes do Financiamento</Text>
      <View style={styles.detailsContainer}>
      <Text style={styles.detailText}>ID: {cardData.FinanciamentoID}</Text>
        <Text style={styles.detailText}>Nome: {cardData.Nomefinan}</Text>
        <Text style={styles.detailText}>Valor Pego: {cardData.ValorTotal}</Text>
        <Text style={styles.detailText}>Total de Parcelas: {cardData.QuantidadeParcelas}</Text>
        <Text style={styles.detailText}>Parcelas Pagas: {parcelasPagas}</Text>
        <Text style={styles.detailText}>Valor Parcela: {cardData.ValorParcela}</Text>
        <Text style={styles.detailText}>Juros Anual: {(cardData.Juros * 12 * 100).toFixed(2)}%</Text>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={realizarPagamento}>
          <Text style={styles.buttonText}>Realizar Pagamento</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={aumentarPrazo}>
          <Text style={styles.buttonText}>Estender Prazo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textBox}
          placeholder="(em meses)"
          keyboardType="numeric"
          value={novoPrazo}
          onChangeText={(text) => setNovoPrazo(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AcompanhaFinan;
