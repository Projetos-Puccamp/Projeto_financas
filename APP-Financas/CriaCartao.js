import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

function CriaCartao({ navigation }) {
  const [cartaoNome, setCartaoNome] = useState('');
  const [cartaoTipo, setCartaoTipo] = useState('Crédito'); // Valor padrão
  const [cartaoLimite, setCartaoLimite] = useState('');
  const route = useRoute();
  const userID = route.params.userID;

  // Função para alternar entre "Crédito" e "Débito"
  const alternarTipo = () => {
    if (cartaoTipo === 'Crédito') {
      setCartaoTipo('Débito');
    } else {
      setCartaoTipo('Crédito');
    }
  };

  // Função para cadastrar um novo cartão
  const cadastrarCartao = () => {
    const novoCartao = {
      nome: cartaoNome,
      userID: userID, // Você já possui o userID disponível
    };

    // Adicione o limite do cartão se o tipo for 'Crédito'
    if (cartaoTipo === 'Crédito') {
      novoCartao.limite = parseFloat(cartaoLimite);
    }

    let apiURL = '';

    if (cartaoTipo === 'Crédito') {
      apiURL = 'http://192.168.151.187:3001/api/cartao/criacartaoC';
    } else {
      apiURL = 'http://192.168.151.187:3001/api/cartao/criacartaoD';
    }

    fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoCartao),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('A resposta da API não foi bem-sucedida');
          Alert.alert('Erro de acesso ao servidor!');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Cartão cadastrado com sucesso!');
        Alert.alert('Cartão cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert('Erro ao cadastrar cartão, verifique os dados e tente novamente!');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Meu Banco</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cartão"
        value={cartaoNome}
        onChangeText={(text) => setCartaoNome(text)}
      />
      <Text style={styles.label}>Tipo selecionado: {cartaoTipo}</Text>
      {cartaoTipo === 'Crédito' && (
        <TextInput
          style={styles.input}
          placeholder="Limite do Cartão(Usar ponto)"
          keyboardType="numeric"
          value={cartaoLimite}
          onChangeText={(text) => setCartaoLimite(text)}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={alternarTipo}
      >
        <Text style={styles.buttonText}>
          {cartaoTipo === 'Crédito' ? 'Trocar tipo ' : 'Trocar tipo'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={cadastrarCartao}
      >
        <Text style={styles.buttonText}>Cadastrar Cartão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CriaCartao;
