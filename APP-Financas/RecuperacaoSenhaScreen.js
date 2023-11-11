import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { Switch } from 'react-native';

function RecuperacaoSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecuperacaoSenhaScreen = () => {
    console.log('entrou no botão');
    var usuario = {
                email: email
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
    fetch('http://192.168.151.187:3001/api/users/redefinir', requestOptions)
                .then(response => response.json())
                .then(data => {

                  // Processa a resposta da API
                  if(data){
                        navigation.navigate("RecuperarSenha");
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
        <Text style={styles.headerText}>Esqueci Minha Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu endereço de email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRecuperacaoSenhaScreen}
        >
          <Text style={styles.buttonText}>Recuperar</Text>
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

export default RecuperacaoSenhaScreen;