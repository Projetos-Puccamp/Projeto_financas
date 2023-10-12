import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const TransferenciaScreen = ({ route }) => {
  const [saldo, setSaldo] = useState(route.params.saldo);
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('entrada');

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
                    idUsuario: 1
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
                  fetch('http://172.16.233.34:3001/api/conta/add', requestOptions)
                    .then(response => response.json())
                    .then(data => {

                      // Processa a resposta da API
                      if(data){
                                        setSaldo(data.result.novoSaldo);
                  } else {
                    // O login falhou, exiba uma mensagem de erro ao usuário
                         console.log("deu else");
                  }
                    })
                    .catch(error => {
                      // Trata erros
                      console.error('Erro:', error);
                    });
                    console.log(saldo);
      } else if (tipo === 'saida') {
        var usuario = {
                            valor: valorNumerico,
                            idUsuario: 1
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
                          fetch('http://172.16.233.34:3001/api/conta/sub', requestOptions)
                            .then(response => response.json())
                            .then(data => {

                              // Processa a resposta da API
                              if(data){
                                                setSaldo(data.result.novoSaldo);
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
