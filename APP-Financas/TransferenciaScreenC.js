import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TransferenciaScreen = ({ navigation }) => {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [motivo, setMotivo] = useState('');
  const [mostrarMotivo, setMostrarMotivo] = useState(true);
  const route = useRoute();
  const { cardData } = route.params;
  const saldo = route.params.saldo;
  const handleTransferencia = () => {
    if (valor !== '') {
      const valorNumerico = parseFloat(valor);
      const motivoTransferencia = mostrarMotivo ? motivo : 'Não especificar';
      if (tipo === 'gastar') {
        var usuario = {
          valor: valorNumerico,
          cardData: cardData,
          motivo: motivoTransferencia
        };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(usuario),
          credentials: 'include'
        };
        fetch('http://192.168.0.104:3001/api/conta/addC', requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.erro == '') {
              console.log(data);
              Alert.alert("tranferencia realizada");
            } else {
              Alert.alert("Ocorreu um erro, verifique o saldo do cartão");
              console.log("sem data no retorno de api");
            }
          })
          .catch(error => {
            console.error('Erro:', error);
          });
      } else if (tipo === 'pagar') {
        var usuario = {
          valor: valorNumerico,
          cardData: cardData,
          motivo: motivoTransferencia
        };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(usuario),
          credentials: 'include'
        };
        fetch('http://192.168.0.104:3001/api/conta/subC', requestOptions)
          .then(response => response.json())
          .then(data => {

            // Processa a resposta da API
            if (data.erro == '') {
              console.log(data);
              Alert.alert("tranferencia realizada");
            } else {
              console.log("sem data no retorno de api");
            }
          })
          .catch(error => {
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
          style={[styles.tipoButton, tipo === 'gastar' && styles.tipoSelecionado]}
          onPress={() => setTipo('gastar')}
        >
          <Text style={styles.tipoButtonText}>Gastar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tipoButton, tipo === 'pagar' && styles.tipoSelecionado]}
          onPress={() => setTipo('pagar')}
        >
          <Text style={styles.tipoButtonText}>Pagar</Text>
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
