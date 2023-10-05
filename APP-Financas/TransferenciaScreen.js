import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'; // Import necessary components
import { StatusBar } from 'expo-status-bar';

const TransferenciaScreen = ({ route }) => {
  const { saldo, setSaldo } = route.params;
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('entrada');

  const handleTransferencia = () => {
    if (valor !== '') {
      const valorNumerico = parseFloat(valor);

      if (tipo === 'entrada') {
        const novoSaldo = saldo + valorNumerico;
        setSaldo(novoSaldo);
      } else if (tipo === 'saida' && saldo >= valorNumerico) {
        const novoSaldo = saldo - valorNumerico;
        setSaldo(novoSaldo);
      }

      setValor('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transferências</Text>

      <TextInput
        style={styles.input}
        placeholder="Insira o valor"
        keyboardType="numeric"
        onChangeText={(text) => setValor(text)}
        value={valor}
      />

      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[styles.tipoButton, tipo === 'entrada' && styles.tipoSelecionado]}
          onPress={() => setTipo('entrada')}
        >
          <Text style={styles.tipoButtonText}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tipoButton, tipo === 'saida' && styles.tipoSelecionado]}
          onPress={() => setTipo('saida')}
        >
          <Text style={styles.tipoButtonText}>Saída</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleTransferencia}
      >
        <Text style={styles.buttonText}>Realizar Transferência</Text>
      </TouchableOpacity>

      <Text style={styles.saldoText}>Saldo: ${saldo}</Text>

      <StatusBar style="auto" />
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
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tipoButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  tipoSelecionado: {
    backgroundColor: '#4CAF50',
  },
  tipoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  saldoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default TransferenciaScreen;
