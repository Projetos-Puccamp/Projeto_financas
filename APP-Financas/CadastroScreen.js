import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CadastroScreen = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCadastro = () => {
    // Lógica de cadastro (exemplo: criar uma nova conta)
    if (newUsername && newPassword) {
      Alert.alert('Cadastro realizado', 'Sua conta foi criada com sucesso.');
      navigation.goBack(); // Voltar para a tela de login após o cadastro
    } else {
      Alert.alert('Erro de cadastro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Novo nome de usuário"
        onChangeText={(text) => setNewUsername(text)}
        value={newUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        secureTextEntry
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCadastro}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
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

export default CadastroScreen;
