import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TransferenciaScreen = ({ navigation }) => {
  const [valor, setValor] = useState('');
  const [dia, setDia] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const route = useRoute();
  const { cardData } = route.params;

  const handleCadastrarSalario = () => {
    if (valor !== '' && dia !=='') {

        var NSalario = {
            valor: valor,
            cardData: cardData,
            dia: dia,
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NSalario),
            credentials: 'include'
        };
        fetch('http://10.0.2.2:3001/api/cartao/salario', requestOptions)
          .then(response => response.json())
          .then(data => {
          if(data.results === "A")
            Alert.alert('Bem-sucedido', 'A resposta foi bem-sucedida.');
          })
          .catch(error => {
            // Apanhe qualquer erro que ocorra durante a requisição ou ao processar os dados
            console.error('Erro:', error);
            Alert.alert('Erro', 'Ocorreu um erro durante a requisição.');
          });

        setValor('');
        setDia('');
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Cadastro de recebimento de salario</Text>

        <TextInput
          style={styles.input}
          placeholder="Insira o valor"
          keyboardType="numeric"
          onChangeText={(text) => setValor(text)}
          value={valor}
        />
        <TextInput
            style={styles.input}
            placeholder="Digite o dia de recebimento do salário"
            keyboardType="numeric"
            onChangeText={(text) => setDia(text)}
            value={dia}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastrarSalario}>
        <Text style={styles.buttonText}>Cadastrar Recebimento de Salário</Text>
        </TouchableOpacity>
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
    motivoButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    motivoButtonText: {
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
  });

  export default TransferenciaScreen;