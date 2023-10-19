import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { Switch } from 'react-native';
const nodemailer = require('nodemailer');

function RecuperacaoSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = () => {
    console.log('cagou no pau');
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
          onPress={handleRecuperarSenha}
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