import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  var [meuSaldo, setMeuSaldo] = useState(0);
  const route = useRoute();
    const userID = route.params.userID;
  useFocusEffect(
    React.useCallback(() => {
    console.log("home print");
    console.log(userID);
    var usuario = {
                userID: userID
              };
      const requestOptions = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',

                      },
                      body: JSON.stringify(usuario),
                      credentials: 'include'
                    };

      // Realiza a requisição para a API
      fetch('http://192.168.0.104:3001/api/conta/saldo', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // Processa a resposta da API
          if (data) {
          console.log("print data");
              console.log(data.result.novoSaldo);
              setMeuSaldo(data.result.novoSaldo); // Atualize o estado com o valor da API
          } else {
            console.log("deu else1");
          }
        })
        .catch((error) => {
          // Trata erros
          console.error('Erro:', error);
        });
    }, [])
  ); // O segundo argumento vazio faz com que o useEffect seja executado apenas uma vez

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Meu Banco</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Disponível</Text>
        <Text style={styles.balanceAmount}>${meuSaldo}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CalculatorScreen')}
      >
        <Text style={styles.buttonText}>Calculadora de Moedas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TransferenciaScreen', { saldo: meuSaldo, userID: userID })}
      >
        <Text style={styles.buttonText}>Transferências</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CriaCartao', {userID: userID })}
      >
        <Text style={styles.buttonText}>Adicionar Cartão</Text>
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
