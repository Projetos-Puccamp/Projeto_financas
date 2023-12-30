import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TransferenciaScreen = ({ navigation }) => {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [motivo, setMotivo] = useState('');
  const [mostrarMotivo, setMostrarMotivo] = useState(true);
  const route = useRoute();
  const { cardData } = route.params;

  const handleTransferencia = () => {
    if (valor !== '') {
      const valorNumerico = parseFloat(valor);
      const motivoTransferencia = mostrarMotivo ? motivo : 'Não especificar';

      var usuario = {
        valor: valorNumerico,
        cardData: cardData,
        motivo: motivoTransferencia,
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
        credentials: 'include'
      };

      let url = tipo === 'entrada' ? 'http://192.168.56.1:3001/api/conta/addD' : 'http://192.168.56.1:3001/api/conta/subD';

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.erro === '') {
            console.log(data);
            Alert.alert('Transferência realizada com sucesso');
          } else {
            Alert.alert('Ocorreu um erro, verifique as entradas');
            console.log('sem data no retorno de api');
          }
        })
        .catch(error => {
          console.error('Erro:', error);
        });

        setValor('');
        setMotivo('');
        setMostrarMotivo(true);
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
          style={styles.motivoButton}
          onPress={() => setMostrarMotivo(!mostrarMotivo)}
        >
          <Text style={styles.motivoButtonText}>
            {mostrarMotivo ? 'Não detalhar' : 'Detalhar'}
          </Text>
        </TouchableOpacity>
  
        {mostrarMotivo && (
          <TextInput
            style={styles.input}
            placeholder="Detalhe"
            onChangeText={(text) => setMotivo(text)}
            value={motivo}
          />
        )}
  
        <TouchableOpacity
          style={styles.button}
          onPress={handleTransferencia}
        >
          <Text style={styles.buttonText}>Realizar Transferência</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Historico',{ cardData: cardData })}
      >
        <Text style={styles.buttonText}>Historico</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Salario',{ cardData: cardData })}
        >
        <Text style={styles.buttonText}>Salário</Text>
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