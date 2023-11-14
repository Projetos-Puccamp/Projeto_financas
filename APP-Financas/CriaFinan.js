import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

function CriaFinan({ navigation }) {
  const [FinanNome, setFinanNome] = useState('');
  const [FinanValue, setFinanValue] = useState(''); 
  const [FinanJuros, setFinanJuros] = useState('');
  const [FinanPrazo, setFinanPrazo] = useState('');
  const route = useRoute();
  const userID = route.params.userID;

  // Função para cadastrar um novo cartão
  const cadastrarFinanciamento = () => {
    const novoFinan = {
      nome: FinanNome,
      total: FinanValue,
      juros: FinanJuros,
      parcelas: FinanPrazo,
      userID: userID, 
    };


    fetch('http://192.168.151.187:3001/api/financiamento/criafinanciamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoFinan),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('A resposta da API não foi bem-sucedida');
          Alert.alert('Erro de acesso ao servidor!');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Financiamento cadastrado com sucesso!');
        Alert.alert('Financiamento cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert('Erro ao cadastrar Financiamento, verifique os dados e tente novamente!');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Meu Banco</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Financiamento"
        value={FinanNome}
        onChangeText={(text) => setFinanNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor do Financiamento (R$)"
        keyboardType="numeric"
        onChangeText={(text) => setFinanValue(text)}
        value={FinanValue}
      />

      <TextInput
        style={styles.input}
        placeholder="Taxa de Juros Anual (%)"
        keyboardType="numeric"
        onChangeText={(text) => setFinanJuros(text)}
        value={FinanJuros}
      />

      <TextInput
        style={styles.input}
        placeholder="Prazo do Financiamento (Meses)"
        keyboardType="numeric"
        onChangeText={(text) => setFinanPrazo(text)}
        value={FinanPrazo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={cadastrarFinanciamento}
      >
        <Text style={styles.buttonText}>Cadastrar Financiamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CriaFinan;
