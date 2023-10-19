import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { Switch } from 'react-native';

function LoginScreen() {
  const navigation = useNavigation(); // Get the navigation object
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberAccount, setRememberAccount] = useState(false);


  const handleLogin = () => {
    // Login logic
    var usuario = {
            email: username,
            senha: password
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
          fetch('http://192.168.56.1:3001/api/users/login', requestOptions)
            .then(response => response.json())
            .then(data => {

              // Processa a resposta da API
              if(data.autenticado){
                    navigation.navigate("Home");
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

  const handleSignupPress = () => {
    navigation.navigate('CadastroScreen'); // Use the correct name "CadastroScreen"
  };


  return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Lembrar Minha Conta</Text>
          <Switch
            value={rememberAccount}
            onValueChange={(value) => setRememberAccount(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignupPress}
        >
          <Text style={styles.signupButtonText}>Cadastre-se</Text>
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
  signupButton: {
    marginTop: 10,
  },
  signupButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default LoginScreen;
