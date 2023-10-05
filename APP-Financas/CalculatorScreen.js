import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CalculatorScreen() {
  const [quantidade, setQuantidade] = useState(''); // Estado para armazenar a quantidade
  const [resultado, setResultado] = useState(null); // Estado para armazenar o resultado
  const [Sufixo, setSufixo] = useState('$'); // Estado para armazenar o resultado
  

  const calcularResultado = async (Moeda) => {
    if (quantidade !== '') {
      try {
        
        let multiplicador = await getMoneyValue(Moeda);
        const resultadoCalculado = parseFloat(quantidade) * multiplicador;
        setResultado(resultadoCalculado.toFixed(2));
        setSufixo('RS');
      } catch (error) {
        console.error("Erro ao calcular resultado:", error);
      }
    }
  };
  const calcularResultadoInverso = async (Moeda) => {
    if (quantidade !== '') {
      try {
        let multiplicador = await getMoneyValue(Moeda);
        const setMoeda = Moeda.slice(0, 3);
        const resultadoCalculado = parseFloat(quantidade) * (1/multiplicador);
        setResultado(resultadoCalculado.toFixed(2));
        setSufixo(setMoeda);
      } catch (error) {
        console.error("Erro ao calcular resultado:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calculadora de Moedas</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira a quantidade"
        keyboardType="numeric"
        onChangeText={(text) => setQuantidade(text)}
        value={quantidade}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => calcularResultado('USD-BRL')}
          >
            <Text style={styles.buttonText}>Dólares -> Real</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => calcularResultado('EUR-BRL')}
          >
            <Text style={styles.buttonText}>Euro -> Real</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => calcularResultado('GBP-BRL')}
          >
            <Text style={styles.buttonText}>Libra -> Real</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => calcularResultadoInverso('USD-BRL')}
          >
            <Text style={styles.buttonText}>Real -> Dólares</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => calcularResultadoInverso('EUR-BRL')}
          >
            <Text style={styles.buttonText}>Real -> Euro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => calcularResultadoInverso('GBP-BRL')}
          >
            <Text style={styles.buttonText}>Real -> Libra</Text>
          </TouchableOpacity>
        </View>
      </View>

      {resultado !== null && (
        <Text style={styles.resultText}>
          Resultado: {Sufixo} {resultado}
        </Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

async function getMoneyValue(Moeda) {
  let url = `https://economia.awesomeapi.com.br/last/${Moeda}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      switch (Moeda) {
        case 'USD-BRL':
          conv = parseFloat(data.USDBRL.ask);
          console.log(conv);
          break;
        case 'EUR-BRL':
          conv = parseFloat(data.EURBRL.ask);
          console.log(conv);
          break;
        case 'GBP-BRL':
          conv = parseFloat(data.GBPBRL.ask);
          console.log(conv);
          break;
       
        default:
          return 1.0;
      }

      return conv;

    } else {
      throw new Error("Dados de conversão não encontrados.");
    }
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
}





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
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space evenly between buttons
    flex: 0.6, // Decreased the flex to make the button containers smaller
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
    marginTop: 10,
  },
  buttonTextInverse: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CalculatorScreen;
