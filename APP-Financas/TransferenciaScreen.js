import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TransferenciaScreen = ({ navigation }) => {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const route = useRoute();
  const userID = route.params.userID;
  const saldo = route.params.saldo;
  const [meuSaldo, setMeuSaldo] = useState(saldo);

  useEffect(() => {
    // This useEffect will run whenever saldo changes
    // You can use it to update the UI or perform other actions
  }, [saldo]);

  const handleTransferencia = () => {
    if (valor !== '') {
      const valorNumerico = parseFloat(valor);

      if (tipo === 'entrada') {
        var usuario = {
                    valor: valorNumerico,
                    userID: userID
                  };
                  // Aqui você pode fazer o que quiser com o objeto 'usuario'
                  // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX
                  const requestOptions = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(usuario),
                    credentials: 'include'
                  };
                  // Realiza a requisição para a API
                  fetch('http://192.168.56.1:3001/api/conta/add', requestOptions)
                    .then(response => response.json())
                    .then(data => {

                      // Processa a resposta da API
                      if(data){
                        setMeuSaldo(data.result.novoSaldo);
                        Alert.alert("tranferencia realizada");
                  } else {
                    // O login falhou, exiba uma mensagem de erro ao usuário
                         console.log("deu else");
                  }
                    })
                    .catch(error => {
                      // Trata erros
                      console.error('Erro:', error);
                    });
      } else if (tipo === 'saida') {
        var usuario = {
                            valor: valorNumerico,
                            userID: userID
                          };
                          // Aqui você pode fazer o que quiser com o objeto 'usuario'
                          // Por exemplo, enviar os dados para o servidor através de uma requisição AJAX
                          const requestOptions = {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',

                            },
                            body: JSON.stringify(usuario),
                            credentials: 'include'
                          };
                          // Realiza a requisição para a API
                          fetch('http://192.168.56.1:3001/api/conta/sub', requestOptions)
                            .then(response => response.json())
                            .then(data => {

                              // Processa a resposta da API
                              if(data){
                                                setMeuSaldo(data.result.novoSaldo);
                          } else {
                            // O login falhou, exiba uma mensagem de erro ao usuário
                                 console.log("deu else");
                          }
                            })
                            .catch(error => {
                              // Trata erros
                              console.error('Erro:', error);
                            });
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
