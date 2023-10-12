import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar} from 'react-native';

function HomeScreen({ navigation, saldo, setSaldo }) {
var meusaldo =0;
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    // Realiza a requisição para a API
    fetch('http://172.16.233.34:3001/api/conta/saldo', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Processa a resposta da API
        if (data && data.Saldo) {
          meusaldo = data.Saldo; // Atualize o saldo com o valor da API
          console.log(meusaldo);
        } else {
          // O login falhou, exiba uma mensagem de erro ao usuário
          console.log("deu else");
        }
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Meu Banco</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo Disponível</Text>
          <Text style={styles.balanceAmount}>${meusaldo}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CalculatorScreen')}
        >
          <Text style={styles.buttonText}>Calculadora de Moedas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('TransferenciaScreen', {
              saldo: saldo, // Pass the saldo prop
              setSaldo: setSaldo, // Pass the setSaldo prop
            })
          }
        >
          <Text style={styles.buttonText}>Transferências</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
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
  balanceContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#333',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
