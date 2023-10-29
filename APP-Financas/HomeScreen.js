import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  var [meuSaldo, setMeuSaldo] = useState(0);
  const route = useRoute();
    const userID = route.params.userID;
  useFocusEffect(
    React.useCallback(() => {
    console.log("home userID:");
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
      fetch('http://192.168.56.1:3001/api/conta/saldo', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // Processa a resposta da API
          if (data) {
          console.log("Saldo recebido:");
              console.log(data.result.novoSaldo);
              setMeuSaldo(data.result.novoSaldo); // Atualize o estado com o valor da API
          } else {
            console.log("Data == false na chamada de show");
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
      <CardList userID={userID} />
        </View>
      );
    }

    // Componente para listar os cartões
    function CardList({ userID }) {
      const [cards, setCards] = useState([]);

      useEffect(() => {
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
        fetch('http://192.168.56.1:3001/api/cartao/list', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data){
                    setCards(data);
                    console.log('Dados definidos:', data);
                } else {
                    console.log("Sem data");
                }
            })
            .catch(error => {
            console.error('Erro:', error);
            });
      }, [userID]);

      return (
        <View style={styles.cardListContainer}>
          <Text style={styles.cardListHeader}>Meus Cartões De Débito:</Text>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.CartaoDID.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                <Text style={styles.cardName}>{item.Nomecartao}</Text>
                <Text style={styles.cardNumber}>{item.Saldo}</Text>
                {/* Outras informações do cartão, se necessário */}
              </View>
            )}
          />
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
  cardListContainer: {
        marginTop: 20,
      },
      cardListHeader: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      cardItem: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
      },
      cardName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      cardNumber: {
        fontSize: 14,
        color: '#333',
      },
    });

export default HomeScreen;
