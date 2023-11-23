import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { Switch } from 'react-native';

function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cod, setCod] = useState('');

  const handleRecuperarSenha = () => {
    console.log('entrou no botão');
    var usuario = {
      email: email,
      senha: senha,
      cod: cod
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
    fetch('http://192.168.0.104:3001/api/users/redefinir2', requestOptions)
      .then(response => response.json())
      .then(data => {

        // Processa a resposta da API
        if (data) {
          Alert.alert("Senha mudou");
        } else {
          // O login falhou, exiba uma mensagem de erro ao usuário
          Alert.alert("Credencias invalidas");
        }
      })
      .catch(error => {
        // Trata erros
        console.error('Erro:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Digite seu código e o email utilizado para login</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu email de login"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Sua nova senha"
        onChangeText={(text) => setSenha(text)}
        value={senha}
      />
      <TextInput
        style={styles.input}
        placeholder="Sua nova senha"
        onChangeText={(text) => setSenha(text)}
        value={senha}
      />
      <TextInput
        style={styles.input}
        placeholder="Código enviado no email"
        onChangeText={(text) => setCod(text)}
        value={cod}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRecuperarSenha}
      >
        <Text style={styles.buttonText}>Mudar senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecuperarSenha;