import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

function LoginScreen() {
  const navigation = useNavigation(); // Get the navigation object
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const users = [
    { username: 'miguel', password: '1234' },
    { username: 'joao', password: 'senha123' },
    // Add more user accounts as needed
  ];

  const handleLogin = () => {
    // Login logic
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      Alert.alert('Login bem-sucedido', `Você está conectado como ${user.username}.`);
      navigation.navigate('Home'); // Navigate to the "Home" screen upon successful login
    } else {
      Alert.alert('Erro de login', 'Nome de usuário ou senha incorretos.');
    }
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
});

export default LoginScreen;
