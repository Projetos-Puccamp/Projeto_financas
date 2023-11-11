import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CalculadoraFinanciamentoScreen = ({ navigation }) => {
  const [valorFinanciamento, setValorFinanciamento] = useState('');
  const [taxaDeJuros, setTaxaDeJuros] = useState('');
  const [prazoFinanciamento, setPrazoFinanciamento] = useState('');
  const [parcelaMensal, setParcelaMensal] = useState('');

  const calcularParcelaMensal = () => {
    if (valorFinanciamento && taxaDeJuros && prazoFinanciamento) {
      const principal = parseFloat(valorFinanciamento);
      const taxa = parseFloat(taxaDeJuros) / 100 / 12;
      const prazo = parseFloat(prazoFinanciamento);
      const parcelaMensal = (principal * taxa) / (1 - Math.pow(1 + taxa, -prazo));
      setParcelaMensal(parcelaMensal.toFixed(2));
    } else {
      Alert.alert('Informações Incompletas', 'Por favor, preencha todos os detalhes do financiamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calculadora de Financiamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Valor do Financiamento (R$)"
        keyboardType="numeric"
        onChangeText={(text) => setValorFinanciamento(text)}
        value={valorFinanciamento}
      />

      <TextInput
        style={styles.input}
        placeholder="Taxa de Juros Anual (%)"
        keyboardType="numeric"
        onChangeText={(text) => setTaxaDeJuros(text)}
        value={taxaDeJuros}
      />

      <TextInput
        style={styles.input}
        placeholder="Prazo do Financiamento (Meses)"
        keyboardType="numeric"
        onChangeText={(text) => setPrazoFinanciamento(text)}
        value={prazoFinanciamento}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={calcularParcelaMensal}
      >
        <Text style={styles.buttonText}>Calcular Parcela Mensal</Text>
      </TouchableOpacity>

      {parcelaMensal !== '' && (
        <Text style={styles.resultText}>
          Parcela Mensal: R$ {parcelaMensal}
        </Text>
      )}
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
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
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default CalculadoraFinanciamentoScreen;
